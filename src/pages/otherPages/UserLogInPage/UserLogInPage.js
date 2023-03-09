import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../../context/AuthContext';
import axios from "axios";
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import {useForm} from 'react-hook-form';
import InputComponent from "../../../components/otherComponents/others/InputComponent/InputComponent";
import styles from './UserLogInPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {PostRequest} from "../../../helpers/axiosHelper";


function UserLogInPage({redirect}) {
    const {login} = useContext(AuthContext);
    const [forbidden, toggleForbidden] = React.useState(null);
    const {handleSubmit, formState: {errors}, register, watch} = useForm({
        mode: 'onTouched',
        defaultValues: {
            'username': null,
            'password': null,
        }
    });


    async function handleLoginSubmit(data) {
        const response = await new PostRequest('/authenticate', {
            username: data.username,
            password: data.password,
        }).invoke();

        if (response) {
            toggleForbidden(false);
            login(response.data.jwt, redirect);
        } else toggleForbidden(true);
    }

    console.log('forbidden: ', forbidden);
    return (
        <>
            <Header>
                <h1>Log in</h1>
                <h4> sign in to your acccount</h4>
            </Header>
            <main>
                {forbidden && <p>Oops... Wrong username/password combination!</p>}
                <form onSubmit={handleSubmit(handleLoginSubmit)}>
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
                    <button type="submit">Log in</button>
                </form>
                <p>Don't have an account yet? Please <Link to="/register">Register</Link> first.</p>
                <p><Link onClick={() => window.history.back()} to="#">{` <<Back`}</Link></p>
            </main>
            <Footer/>
        </>
    );
}

export default UserLogInPage;