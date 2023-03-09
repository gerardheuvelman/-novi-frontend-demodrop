import React from 'react';
import InputComponent from "../../otherComponents/others/InputComponent/InputComponent";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {PostRequest} from "../../../helpers/axiosHelper";

function UserForm({mode}) {
    const navigate = useNavigate();
    const { handleSubmit, formState: { errors }, register, watch } = useForm({ mode: 'onTouched',
        defaultValues: {
            'email': null,
            'username': null,
            'password': null,
        } });

    function handleFormSubmit(data) {
        if (mode === 'anon' || mode == 'admin') {
            void registerUserAsync(data);
        }
        if (mode === 'newadmin') {
            void registerAdminAsync(data);
        }
    }

    async function registerUserAsync({email, username, password}) {
        const response = await new PostRequest('/users',{
            email: email,
            username: username,
            password: password,
        }).invoke();
        if (response.status === 201) {
            navigate('/login');
        } else console.error("Returned status from API call was not 201 Created");
    }

    async function registerAdminAsync({email, username, password}) {
        const response = await new PostRequest('/users/admin',{
            email: email,
            username: username,
            password: password,
        }).invoke();
        if (response.status === 201) {
            navigate('/admin/users');
        } else console.error("Returned status from API call was not 201 Created");
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                        value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
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

            <button type="submit">Register</button>
        </form>

    );
}

export default UserForm;