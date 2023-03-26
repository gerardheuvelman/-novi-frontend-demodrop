import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../../../context/AuthContext';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import {useForm} from 'react-hook-form';
import InputComponent from "../../../components/otherComponents/others/InputComponent/InputComponent";
import styles from './UserChangeEmailPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {PatchRequest} from "../../../helpers/axiosHelper";
import MainComponent from "../../../components/otherComponents/structuralComponents/MainComponent/MainComponent";
import Button from "../../../components/otherComponents/buttons/Button/Button";

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
                <h3>Change email address</h3>
                <h4> ...for user {user.username} </h4>
            </Header>
            <MainComponent>
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
                    <Button color='white' type="submit">Change email</Button>
                    <span><Link className='white' to={`/users/${user.username}/myprofile`}>Back</Link> to your profile page</span>
                </form>
            </MainComponent>
            <Footer/>
        </>
    );
}

export default UserChangePasswordPage;