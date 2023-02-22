import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import axios from "axios";
import Header from "../../components/Header/Header";
import {useForm} from 'react-hook-form';
import InputComponent from "../../components/InputComponent/InputComponent";
import styles from './UserChangeEmailPage.module.css';
import Footer from "../../components/Footer/Footer";

function UserChangePasswordPage() {
    const {user} = useContext(AuthContext);
    const storedToken = localStorage.getItem("token");
    const {handleSubmit, formState: {errors}, register, watch} = useForm({
        mode: 'onTouched',
    });
    const [responseBody, setResponseBody] = useState(null)

    async function handleFormSubmit(data) {
       const controller = new AbortController();
        await submitNewPasswordAsync( data, controller);
    }
        async function submitNewPasswordAsync(data, controller) {
            try {
                const response = await axios.patch(`http://localhost:8080/users/${user.username}/change-email`, {
                    username: null,
                    password: null,
                    email: data.newEmail,
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${storedToken}`,
                    },
                    signal: controller.signal
                });
                console.log(response);
                setResponseBody(response.data);
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
                <h1>Change email address</h1>
                <h4> ...for user {user.username} </h4>
            </Header>
            <main>
                { responseBody && <h4>{responseBody}</h4>}
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <InputComponent
                        inputType="email"
                        inputName="newEmail"
                        inputId="newEmail-field"
                        inputLabel="New email address:"
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
                    <button type="submit">Change email</button>
                </form>
                <p><Link to={`/users/${user.username}/profile`}>Back</Link> to your profile page</p>
            </main>
            <Footer/>
        </>
    );
}
export default UserChangePasswordPage;