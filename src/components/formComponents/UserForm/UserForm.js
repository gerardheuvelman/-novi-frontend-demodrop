import React, {useContext, useState} from 'react';
import InputComponent from "../../otherComponents/others/InputComponent/InputComponent";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {PostRequest, PutRequest} from "../../../helpers/axiosHelper";
import styles from './UserForm.module..css';
import Button from "../../otherComponents/buttons/Button/Button";

function UserForm({mode, type, prefillUser}) { // modes : 'anon' or 'admin; types: 'create', 'createadmin', or 'update'
    const [createSuccess, toggleCreateSuccess] = useState(false);
    const [updateSuccess, toggleUpdateSuccess] = useState(false);
    const navigate = useNavigate();
    const {handleSubmit, formState: {errors}, register, watch} = useForm({
        mode: 'onTouched',
        defaultValues: {
            'username': prefillUser.username,
            'password': prefillUser.password,
            'email': prefillUser.email
        }
    });

    console.log('mode for UserForm: ', mode);
    console.log('prefillUser for UserForm: ', prefillUser);

    function handleFormSubmit(data) {
        if (type === 'create') {
            void CreateStandardUserAsync(data);
        }
        if (type === 'createadmin') {
            void CreateAdminAsync(data)
        }
        if (type === 'update') {
            void updateUserAsync(data)
        }
    }

    async function CreateStandardUserAsync({email, username, password}) {
        const response = await new PostRequest('/users', {
            email: email,
            username: username,
            password: password,
        }).invoke();
        if (response.status === 201) {
            if (mode !== 'admin') {
                navigate('/login');
            }
            if (mode === 'admin') {
                toggleCreateSuccess(true);
                navigate(`/admin/users/${username}`);
            }
        } else console.error("Returned status from API call was not 201 Created");
    }

    async function CreateAdminAsync({email, username, password}) {
        const response = await new PostRequest('/users/admin', {
            email: email,
            username: username,
            password: password,
        }).invoke();
        if (response.status === 201) {
            toggleCreateSuccess(true);
            navigate(`/admin/users/${username}`);
        } else console.error("Returned status from API call was not 201 Created");
    }

    async function updateUserAsync({email, username, password}) {
        const response = await new PutRequest(`/users/${username}`, {
            email: email,
            username: username,
            password: password,
        }).invoke();
        if (response.status === 200) {
            if (mode === 'admin') { // "Edit user" is only used in admin mode, as the user modes have other specialized pages for changing email and changing password
                toggleUpdateSuccess(true);
                navigate(`/admin/users/${username}`);
            }

        } else console.error("Returned status from API call was not 201 Created");
    }

    return (
        <>
            {prefillUser &&
                <form className='form' onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className='form-input'>
                        <h3>Enter user details</h3>
                        <InputComponent
                            inputType="email"
                            inputName="email"
                            inputId="email-field"
                            inputLabel="Email address:"
                            validationRules={{
                                required: {
                                    value: true,
                                    message: ' A valid Email address is required',
                                },
                                pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                    message: 'This is not a valid email address'
                                }
                            }}
                            register={register}
                            errors={errors}
                        />

                        <InputComponent
                            inputType="text"
                            inputName="username"
                            inputId="username-field"
                            inputLabel="Username:"
                            validationRules={{
                                required: {
                                    value: true,
                                    message: 'Username is required',
                                },
                                minLength: {
                                    value: 4,
                                    message: 'Username must be at least 4 characters long',
                                },
                                maxLength: {
                                    value: 30,
                                    message: 'Username may be a maximum of 30 characters long ',
                                },
                            }}
                            register={register}
                            errors={errors}
                        />

                        <InputComponent
                            inputType="password"
                            inputName="password"
                            inputId="password-field"
                            inputLabel="Password:"
                            validationRules={{
                                required: {
                                    value: true,
                                    message: 'Password is required',
                                },
                                minLength: {
                                    value: 4,
                                    message: 'Password must be at least 4 characters long',
                                },
                                maxLength: {
                                    value: 30,
                                    message: 'Password may be a maximum of 30 characters long ',
                                },
                            }}
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <div className='form-controls'>
                        <h3>Available actions</h3>
                        {mode !== 'admin' && <Button color='white' type="submit">Register</Button>}
                        {mode === 'admin' && <Button color='white' type="submit">Save user</Button>}
                        {createSuccess === true && <p>A new user has been created.</p>}
                        {updateSuccess === true && <p>This user has been successfully updated.</p>}

                        {mode !== 'admin' && <span>Have an account already? Sign in <Link to="/login">here</Link>.</span>}


                    </div>
                </form>
            }
        </>
    );
}

export default UserForm;