import React, {useEffect, useState} from 'react';
import axios from 'axios';
import InputComponent from '../../components/InputComponent/InputComponent';
import {useParams} from "react-router-dom";
import {useForm} from 'react-hook-form';
import styles from './DemoForm.module.scss';

function DemoForm({mode, prefillDemo}) {
    const [file, setFile] = useState([]);
    const {id} = useParams(); // BIJ MODE "CREATE" (POST) is dit "undefined"
    const storedToken = localStorage.getItem('token');
    const [genreList, setGenreList] = useState([]);
    const [createSuccess, toggleCreateSuccess] = useState(false);
    const [updateSuccess, toggleUpdateSuccess] = useState(false);
    const {handleSubmit, formState: {errors}, register, watch} = useForm({
        mode: 'onTouched',
        defaultValues: {
            'title': prefillDemo.title,
            length: prefillDemo.length,
            bpm: prefillDemo.bpm,
            genre: prefillDemo.genre,
            file: null
        }
    });
    let fileWasSelected = false

    console.log(mode, prefillDemo);

    useEffect(() => { // TODO: Moderniseren
        async function fetchGenres() {
            try {
                const response = await axios.get('http://localhost:8080/genres');
                console.log('fetchGenres(): ', response.data);
                // SORT THE LIST BEFORE SETTING THE STATE VARIABLE
                setGenreList(response.data.sort((a,b) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                }));
                // console.log('unsorted genreList: ', genreList)
                genreList.sort((a,b) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name< b.name) {
                        return -1;
                    }
                    return 0;
                });
                // console.log('sorted genreList: ', genreList)
            } catch (e) {
                console.error(e);
            }
        }

        void fetchGenres();
    }, []);

    async function handeDemoFormSubmit(data) {
        console.log('data: ', data)
        console.log('file: ', file);
        if (mode === 'create') {
            console.log('fileWasSelected: ', fileWasSelected);
            console.log('file: ', file);
            console.log('file !== []: ', file !== []);
            if (file !== []) {
                const newDemoId = await createDemo(data);
                await sendFileWithDemoId(newDemoId, data);
            }
        } else if (mode === 'update') {
            const updatedDemoId = await updateDemo(data);
            if (fileWasSelected) {
                await sendFileWithDemoId(updatedDemoId, data);
            }
        }
    }

    async function createDemo({title, length, bpm, genre}) {
        console.log('genre: ', genre);
        try {
            const response = await axios.post('http://localhost:8080/demos', {
                title: title,
                length: length,
                bpm: bpm,
                audioFile: null,
                genre: {name: genre}
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedToken}`
                }
            });
            console.log('CreateDemo(): ', response);
            toggleCreateSuccess(true);
            return response.data.demoId;
        } catch (e) {
            console.error(e);
        }
    }

    async function updateDemo({title, length, bpm, genre}) {
        try {
            const response = await axios.put(`http://localhost:8080/demos/${id}`, {
                title: title,
                length: length,
                bpm: bpm,
                genre: {name: genre}
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedToken}`
                }
            });
            console.log('updateDemo(): ', response);
            toggleUpdateSuccess(true);
            return response.data.demoId;
        } catch (e) {
            console.error(e);
        }
    }

    async function sendFileWithDemoId(demoId, {file}) {
        console.log("now sending file to be associated with demo :", demoId);
        console.log('file: ', file[0]);
        const formData = new FormData();
        formData.append("file", file[0]);
        console.log(formData);
        try {
            const result = await axios.post(`http://localhost:8080/demos/${demoId}/file`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${storedToken}`
                    },
                })
            console.log('sendFileWithDemoId(demoId): ', result);
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <div className="page-container">
                {createSuccess === true && <p>Demo has been created!</p>}
                {updateSuccess === true && <p>Demo has been updated!</p>}
                <form onSubmit={handleSubmit(handeDemoFormSubmit)}>
                    <InputComponent
                        inputType="text"
                        inputName="title"
                        inputId="title-field"
                        inputLabel="Title:"
                        validationRules={{
                            required: {
                                value: true,
                                message: 'Title is required',
                            },
                            minLength: {
                                value: 2,
                                message: 'Title must be at least 2 characters long',
                            },
                            maxLength: {
                                value: 1000,
                                message: 'Title may be a maximum of 1000 characters ',
                            },
                        }}
                        register={register}
                        errors={errors}
                    />

                    <InputComponent
                        inputType="text"
                        inputName="length"
                        inputId="length-field"
                        inputLabel="Length in Seconds:"
                        validationRules={{
                            required: {
                                value: true,
                                message: 'Length is required',
                            },
                            min: {
                                value: 10,
                                message: 'Demo length must be at least 10 seconds',
                            },
                            max: {
                                value: 10000,
                                message: 'Demo length must be at most 10000 seconds',
                            },
                        }}
                        register={register}
                        errors={errors}
                    />

                    <InputComponent
                        inputType="text"
                        inputName="bpm"
                        inputId="bpm-field"
                        inputLabel="Beats per minute:"
                        validationRules={{
                            required: {
                                value: true,
                                message: 'BPM is required',
                            },
                            min: {
                                value: 10,
                                message: 'Demo BPM must be at least 10',
                            },
                            max: {
                                value: 1000,
                                message: 'Demo BPM must be at most 1000',
                            },
                        }}
                        register={register}
                        errors={errors}
                    />

                    <label htmlFor='genre-field'>
                        <select
                            id='genre-field'
                            {...register('genre', {
                                required: {
                                    value: true,
                                    message: 'Genre is required',
                                },
                            })}
                        >
                            <option value="" disabled selected>Select a genre...</option>
                            {genreList.map((genre) => { // LET OP: Bij tables moet hier een key staan. Moet dat ook als je <option>  returned?
                                return <option value={genre.name} key={genre.name}>
                                    {genre.name}
                                </option>
                            })}

                        </select>
                    </label>
                    {errors['genre'] && <p>{errors['genre'].message}</p>}

                    <InputComponent
                        inputType="file"
                        inputName="file"
                        inputId="file-field"
                        inputLabel="Select an audioFile:"
                        validationRules={{
                            required: {
                                value: true,
                                message: 'Selecting a file is required',
                            },
                        }}
                        register={register}
                        errors={errors}
                    />

                    <button type="submit">
                        {mode === 'create' && <h1>Create</h1>}
                        {mode === 'update' && <h1>Update</h1>}
                    </button>
                </form>
            </div>
        </>
    );
}

export default DemoForm;