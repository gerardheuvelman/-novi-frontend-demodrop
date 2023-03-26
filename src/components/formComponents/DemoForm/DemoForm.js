import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import InputComponent from '../../otherComponents/others/InputComponent/InputComponent';
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from 'react-hook-form';
import styles from './DemoForm.module.css';
import {AuthContext} from "../../../context/AuthContext";
import {PostRequest, PutRequest} from "../../../helpers/axiosHelper";
import Button from "../../otherComponents/buttons/Button/Button";

function DemoForm({mode, type, prefillDemo}) { // modes : 'admin' or others; types: 'create' or 'update'
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

    console.log('mode in DemoForm: ', mode);
    console.log('type in DemoFrom: : ', type);
    console.log('prefillDemo in DemoForm: ', prefillDemo);

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

    async function handleFormSubmit(data) {
        console.log('handleFormSubmit invoked!');
        if (type === 'create') {
            if (file !== []) {
                const newDemoId = await createDemo(data);
                await sendFileWithDemoId(newDemoId, data);
            }
        } else if (type === 'update') {
            console.log('now running updateDemo(data): ')
            const updatedDemoId = await updateDemo(data);
            if (data.file) {
                await sendFileWithDemoId(updatedDemoId, data);
            }
        }
        // navigate(`/users/${user.username}/demos`);
    }

    async function createDemo({title, length, bpm, genre}) {
        console.log('createDemo invoked!');
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
        console.log('updateDemo invoked!');
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
        const url = `${scheme}://${domain}:${port}/demos/${demoId}/upload`
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
            {prefillDemo &&
                <form className='form' onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className='form-input'>
                        <h3>Enter demo details</h3>
                        <InputComponent
                            inputType="text" s
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
                            Genre:
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

                        {type === 'create' &&
                            <InputComponent
                                inputType="file"
                                fileAccept='.mp3'
                                inputName="file"
                                inputId="file-field"
                                inputLabel="Select an audioFile:"
                                validationRules={{
                                    onChange: (e) => {
                                        handleFileChange(e)
                                    },
                                    required: {
                                        value: true,
                                        message: 'Selecting a file is required',
                                    },
                                }}
                                register={register}
                                errors={errors}
                            />}

                        {type === 'update' &&
                            <InputComponent
                                inputType="file"
                                fileAccept='.mp3'
                                inputName="file"
                                inputId="file-field"
                                inputLabel="Select a new audioFile:"
                                validationRules={{
                                    onChange: (e) => {
                                        handleFileChange(e)
                                    },
                                    required: {
                                        value: false,
                                        message: 'Selecting a file is not required',
                                    },
                                }}
                                register={register}
                                errors={errors}
                            />}
                    </div>
                    <div className='form-controls'>
                        {previewUrl && <audio controls>
                            <source src={previewUrl} type="audio/mpeg" id="myAudio"/>
                        </audio>}

                        {type === 'create' && <Button color='white' type="submit">Create</Button>}
                        {type === 'update' && <Button color='white' type="submit">Update</Button>}
                        {createSuccess === true && <p>A new demo has been created!</p>}
                        {updateSuccess === true && <p>This demo has been successfully updated!</p>}
                        {assignResponse && <p>A new audio file has been assigned to this demo!</p>}
                    </div>
                </form>
            }
        </>
    );
}


export default DemoForm;