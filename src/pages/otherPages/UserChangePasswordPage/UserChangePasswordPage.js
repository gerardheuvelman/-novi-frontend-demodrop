import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../../context/AuthContext';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import {useForm} from 'react-hook-form';
import InputComponent from "../../../components/otherComponents/others/InputComponent/InputComponent";
import styles from './UserChangePasswordPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {PatchRequest} from "../../../helpers/axiosHelper";

function UserChangePasswordPage() {
    const {user} = useContext(AuthContext);
    const {handleSubmit, formState: {errors}, register, watch} = useForm({
        mode: 'onTouched',
    });
    const [responseBody, setResponseBody] = useState(null)

    async function submitNewPasswordAsync(data) {
        console.log('data: ', data);
        const response = await new PatchRequest(`/users/${user.username}/change-password`,{
            username: null,
            password: data.newPassword,
            email: null
        }).invoke();
        console.log('response: ',response);
        setResponseBody(response.data);
    }

    return (
        <>
            <Header>
                <h1>Change password</h1>
                <h4> ...for user {user.username} </h4>
            </Header>
            <main>
                {responseBody && <h4>{responseBody}</h4>}
                <form onSubmit={handleSubmit(submitNewPasswordAsync)}>
                    <InputComponent
                        inputType="password"
                        inputName="newPassword"
                        inputId="newPassword-field"
                        inputLabel="New password:"
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
                                message: 'Password may be a maximum of 30 characters ',
                            },
                        }}
                        register={register}
                        errors={errors}
                    />

                    <InputComponent
                        inputType="password"
                        inputName="confirmPassword"
                        inputId="confirmPassword-field"
                        inputLabel="Confirm password:"
                        validationRules={{
                            required: {
                                value: true,
                                message: 'Confirm Password is required',
                            },
                            validate: (val) => {
                                if (watch('newPassword') !== val) {
                                    return "Your passwords do no match!!";
                                }
                            }
                        }}
                        register={register}
                        errors={errors}
                    />
                    <button type="submit">Change password</button>
                </form>
                <p><Link to={`/users/${user.username}/profile`}>Back</Link> to your profile page</p>
            </main>
            <Footer/>
        </>
    );
}

export default UserChangePasswordPage;