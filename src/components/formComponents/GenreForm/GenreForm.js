import React, {useContext, useState} from 'react';
import InputComponent from "../../otherComponents/others/InputComponent/InputComponent";
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {PostRequest, PutRequest} from "../../../helpers/axiosHelper";
import {AuthContext} from "../../../context/AuthContext";
import styles from './GenreForm.module..css';

function GenreForm({mode, type, prefillGenre}) { // modes : 'admin; types: 'create', or 'update'
    const [createSuccess, toggleCreateSuccess] = useState(false);
    const [updateSuccess, toggleUpdateSuccess] = useState(false);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const oldGenreName = useParams();
    const {handleSubmit, formState: {errors}, register, watch} = useForm({
        mode: 'onTouched',
        defaultValues: {
            'name': prefillGenre.name,

        }
    });

    console.log('mode for GenreForm: ', mode);
    console.log('prefillGenre for GenreForm: ', prefillGenre);

    function handleFormSubmit(data) {
        if (type === 'create') {
            void createGenreAsync(data);
        }
        if (type === 'update') {
            void updateGenreAsync(data)
        }
    }

    async function createGenreAsync({name}) {
        const response = await new PostRequest('/genres', {
            name: name
        }).invoke();
        if (response.status === 201) {
            if (mode === 'admin') {
                toggleCreateSuccess(true);
                navigate(`/admin/genres`);
            }
        } else console.error("Returned status from API call was not 201 Created");
    }

    async function updateGenreAsync({name}) {
        const response = await new PutRequest(`/genres/${oldGenreName}`, {
            name: name
        }).invoke();
        if (response.status === 200) {
            if (mode === 'admin') { // "Edit genre" is only used in admin mode
                toggleUpdateSuccess(true);
                navigate(`/admin/genres/${name}`);
            }
        } else console.error("Returned status from API call was not 201 Created");
    }

    return (
        <div className="page-container">
            {prefillGenre &&
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <InputComponent
                        inputType="text"
                        inputName="name"
                        inputId="name-field"
                        inputLabel="Genre Name:"
                        validationRules={{
                            required: {
                                value: true,
                                message: ' A (unique) genre name is required',
                            }
                        }}
                        register={register}
                        errors={errors}
                    />
                    {mode === 'create' && <button type="submit">Create</button>}
                    {mode === 'update' && <button type="submit">Update</button>}
                </form>
            }
            {createSuccess === true && <p>A new genre has been created!</p>}
            {updateSuccess === true && <p>This  genre has been successfully updated!</p>}
        </div>
    );
}

export default GenreForm;