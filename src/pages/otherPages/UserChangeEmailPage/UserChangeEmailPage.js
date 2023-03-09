import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../../context/AuthContext';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import {useForm} from 'react-hook-form';
import InputComponent from "../../../components/otherComponents/others/InputComponent/InputComponent";
import styles from './UserChangeEmailPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {PatchRequest} from "../../../helpers/axiosHelper";

function UserChangePasswordPage() {
    const {user} = useContext(AuthContext);
    const {handleSubmit, formState: {errors}, register, watch} = useForm({
        mode: 'onTouched',
    });
    const [responseBody, setResponseBody] = useState(null)

    async function submitNewPasswordAsync(data) {
        const response = await new PatchRequest(`/users/${user.username}/change-email`, {
            username: null,
            password: null,
            email: data.newEmail,
        }).invoke();
        setResponseBody(response.data);
    }

    return (
        <>
            <Header>
                <h1>Change email address</h1>
                <h4> ...for user {user.username} </h4>
            </Header>
            <main>
                {responseBody && <h4>{responseBody}</h4>}
                <form onSubmit={handleSubmit(submitNewPasswordAsync)}>
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
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
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