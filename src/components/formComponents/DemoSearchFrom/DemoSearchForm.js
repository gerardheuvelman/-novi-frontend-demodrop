import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import InputComponent from '../../otherComponents/others/InputComponent/InputComponent';
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from 'react-hook-form';
import styles from './DemoSearchForm.module.css';
import {AuthContext} from "../../../context/AuthContext";
import {GetRequest, PostRequest, PutRequest} from "../../../helpers/axiosHelper";

function DemoSearchForm() {
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
    });

    async function handeSearchFormSubmit(data) {
        await findDemosContaining(data);
        // navigate(`/users/${user.username}/demos`);
    }

    async function findDemosContaining({query}) {
        const response = await new GetRequest(`/demos/find`).invoke();
        return response.data;
    }


    // The method below cannot make use of the Axios POST helper method, because it does not support an alternative header value for "content-type".

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

                        {mode === 'update' &&
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

                        {previewUrl && <audio controls>
                            <source src={previewUrl} type="audio/mpeg" id="myAudio"/>
                        </audio>}

                        {mode === 'create' && <button type="submit">Create</button>}
                        {mode === 'update' && <button type="submit">Update</button>}                    </form>

                }
                {createSuccess === true && <p>A new demo has been created!</p>}
                {updateSuccess === true && <p>This demo has been successfully updated!</p>}
                {assignResponse && <p>A new audio file has been assigned to this demo!</p>}
            </div>
        </>
    );
}


export default DemoForm;