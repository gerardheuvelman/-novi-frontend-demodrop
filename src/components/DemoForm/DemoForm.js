import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import InputComponent from '../../components/InputComponent/InputComponent';
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from 'react-hook-form';
import styles from './DemoForm.module.css';
import {AuthContext} from "../../context/AuthContext";
import {PostRequest, PutRequest} from "../../helpers/axiosHelper";

function DemoForm({mode, prefillDemo}) {
    const scheme = process.env.REACT_APP_SERVER_SCHEME;
    const domain = process.env.REACT_APP_SERVER_DOMAIN;
    const port = process.env.REACT_APP_SERVER_PORT;
    const [file, setFile] = useState([]);
    const {id} = useParams(); // BIJ MODE "CREATE" (POST) is dit "undefined"
    const [genreList, setGenreList] = useState([]);
    const [createSuccess, toggleCreateSuccess] = useState(false);
    const [updateSuccess, toggleUpdateSuccess] = useState(false);
    const [assignResponse, setAssignResponse] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const navigate = useNavigate();
    const storedToken = localStorage.getItem('token');
    const {user} = useContext(AuthContext);
    const {handleSubmit, formState: {errors}, register, watch, setValue} = useForm({
        mode: 'onTouched',
        defaultValues: {
            'title': prefillDemo.title,
            length: prefillDemo.length,
            bpm: prefillDemo.bpm,
            genre: prefillDemo.genre.name, // WERKT NIET!!!!
            file: null
        }
    });
    let fileWasSelected = false

    console.log('mode: ', mode);
    console.log('prefillDemo: ', prefillDemo);

    useEffect(() => {
        async function fetchGenres() {
            try {
                const response = await axios.get('http://localhost:8080/genres');
                console.log('fetchGenres(): ', response.data);
                // SORT THE GENRE LIST BEFORE SETTING THE STATE VARIABLE
                setGenreList(response.data.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                }));
            } catch (e) {
                console.error(e);
            }
        }

        void fetchGenres();
    }, []);

    async function handeDemoFormSubmit(data) {
        console.log('data: ', data);
        console.log('data.file: ', data.file);
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
            console.log('now running updateDemo(data): ')
            const updatedDemoId = await updateDemo(data);
            if (data.file) {
                await sendFileWithDemoId(updatedDemoId, data);
            }
        }
        // navigate(`/users/${user.username}/demos`);
    }

    async function createDemo({title, length, bpm, genre}) {
        const response = await new PostRequest(`/demos`, {
            title: title,
            length: length,
            bpm: bpm,
            audioFile: null,
            genre: {name: genre}
        }).invoke();
        toggleCreateSuccess(true);
        return response.data.demoId;
    }

    async function updateDemo({title, length, bpm, genre}) {
        const response = await new PutRequest(`/demos/${prefillDemo.demoId}`, {
            title: title,
            length: length,
            bpm: bpm,
            file: null,
            genre: {name: genre}
        }).invoke();
        toggleUpdateSuccess(true);
        return response.data.demoId;
    }
    // The method below cannot make use of the Axios POST helper method, because it does not support an alternative header value for "content-type".
    async function sendFileWithDemoId(demoId, {file}) {
        const url = `${scheme}://${domain}:${port}/demos/${demoId}/file`
        console.log("now sending file to be associated with demo :", demoId);
        console.log('file: ', file[0]);
        const formData = new FormData();
        formData.append("file", file[0]);
        console.log(formData);
        try {
            const result = await axios.post(url, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${storedToken}`
                    },
                })
            console.log('sendFileWithDemoId(demoId): ', result);
            setAssignResponse(result.data);
        } catch (e) {
            console.error(e)
        }
    }

    function handleFileChange(e) {
        // save the chosen file
        const uploadedFile = e.target.files[0];
        console.log('uploadedFile: ', uploadedFile);
        // Save in a state variable:
        setFile(uploadedFile);
        // Create a URL that we can use to bind to an <audio> element
        setPreviewUrl(URL.createObjectURL(uploadedFile));
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }

    return (
        <>
            <div className="page-container">
                {prefillDemo &&
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
                                defaultValue={prefillDemo.genre.name}
                                id='genre-field'
                                {...register('genre', {
                                    required: {
                                        value: true,
                                        message: 'Genre is required',
                                    },
                                })}
                            >
                                {genreList.map((genre) => {
                                    return <option
                                        value={genre.name}
                                        key={genre.name}>
                                        {genre.name}
                                    </option>
                                })}
                            </select>
                        </label>
                        {errors['genre'] && <p>{errors['genre'].message}</p>}

                        {mode === 'create' &&
                            <InputComponent
                                inputType="file"
                                fileAccept='.mp3'
                                inputName="file"
                                inputId="file-field"
                                inputLabel="Select an audioFile:"
                                validationRules={{
                                    onChange: (e) => {handleFileChange(e)},
                                    required: {
                                        value: true,
                                        message: 'Selecting a file is required',
                                    },
                                }}
                                register={register}
                                errors={errors}
                            />}

                        {mode === 'update' &&
                            <InputComponent
                                inputType="file"
                                fileAccept='.mp3'
                                inputName="file"
                                inputId="file-field"
                                inputLabel="Select a new audioFile:"
                                validationRules={{
                                    onChange: (e) => {handleFileChange(e)},
                                    required: {
                                        value: false,
                                        message: 'Selecting a file is not required',
                                    },
                                }}
                                register={register}
                                errors={errors}
                            />}

                        {previewUrl && <audio controls><source src={previewUrl} type="audio/mpeg" id="myAudio"/></audio>}

                        <button type="submit">
                            {mode === 'create' && <h1>Create</h1>}
                            {mode === 'update' && <h1>Update</h1>}
                        </button>
                    </form>

                }
                {createSuccess === true && <p>A new demo has been created!</p>}
                {updateSuccess === true && <p>This demo has been successfully updated!</p>}
                {assignResponse && <p>A new audio file has been assigned to this demo!</p>}
            </div>
        </>
    );
}


export default DemoForm;