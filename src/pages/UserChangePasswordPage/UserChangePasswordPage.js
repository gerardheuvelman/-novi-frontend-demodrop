import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import axios from "axios";
import Header from "../../components/Header/Header";
import {useForm} from 'react-hook-form';
import InputComponent from "../../components/InputComponent/InputComponent";
import styles from './UserChangePasswordPage.module.scss';
import Footer from "../../components/Footer/Footer";

function UserChangePasswordPage() {
    const {user} = useContext(AuthContext);
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmNewPassword, setConfirmNewPassword] = React.useState('');
    const storedToken = localStorage.getItem("token");
    const {handleSubmit, formState: {errors}, register, watch} = useForm({
        mode: 'onTouched',
    });

    async function handleFormSubmit(data) {
       const controller = new AbortController();
        await submitNewPasswordAsync(data, controller);
    }
        async function submitNewPasswordAsync(data, controller) {
            try {
                const response = await axios.patch(`http://localhost:8080/users/${user.username}/change-password`, {
                    username: null,
                    password: data.password,
                    email: null
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${storedToken}`,
                    },
                    signal: controller.signal
                });
                console.log(response);
            } catch (e) {
                console.log(e)
            }
            return function cleanup() {
            controller.abort(); // <--- cancel request
            console.log("Cleanup has been executed.")
            }
    }

    return (
        <>
            <Header>
                <h1>Change password</h1>
                <h4> ...for user {user.username} </h4>
            </Header>
            <main>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
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