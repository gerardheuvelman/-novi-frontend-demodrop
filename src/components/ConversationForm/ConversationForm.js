import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from 'react-hook-form';
import InputComponent from "../../components/InputComponent/InputComponent";
import {AuthContext} from "../../context/AuthContext";
import styles from './ConversationForm.module.scss';

function ConversationForm({mode, prefillConversation}) {
    const {demoId, conversationId } = useParams(); // When in create mode, demoId is populated, when in update mode, conversationId will be populated
    const {isAuth, user} = useContext(AuthContext);
    const [createSuccess, toggleCreateSuccess] = useState(false);
    const [updateSuccess, toggleUpdateSuccess] = useState(false);
    const storedToken = localStorage.getItem("token");
    const navigate = useNavigate();

    console.log(prefillConversation.subject)
    console.log(prefillConversation.body)
    const {handleSubmit, formState: {errors}, register, watch} = useForm({
        mode: 'onTouched',
        defaultValues: {
            subject: "test", //prefillConversation.subject,
            body: prefillConversation.body
        }
    });

    console.log(mode);
    console.log(conversationId);

    async function handleFromSubmit(data) {
        if (mode === 'create') {
            await createConversation(data);
        } else if (mode === 'update') {
            await updateConversation(data);
        }
    }

    async function createConversation({subject, body}) {
        try {
            const response = await axios.post('http://localhost:8080/conversations', {
                subject: subject,
                body: body,
                demo: {demoId: demoId}
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedToken}`,
                }
            });
            console.log('axios.post(http://localhost:8080/conversations yields the following response: ', response);
            toggleCreateSuccess(true);
            if (response.status === 201) {
                navigate(`/users/${user.username}/conversations`);
            } else console.error("Returned status from API call was not 201 Created")

        } catch (e) {
            console.error(e);
        }
    }

    async function updateConversation({subject, body}) {
        try {
            const response = await axios.put(`http://localhost:8080/conversations/${conversationId}`, {
                subject: subject,
                body: body,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedToken}`,
                }
            });
            console.log('axios.put(http://localhost:8080/conversations/${id} : ', response);
            toggleUpdateSuccess(true);
            if (response.status === 200) {
                navigate(`/users/${user.username}/conversations`);
            } else console.error("Returned status from API call was not 200 OK")

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
                {mode === 'create' && <h1>Start a new conversation</h1>}
                {createSuccess === true && <p>Message has been sent!</p>}
                {mode === 'update' && <h1>Reply to conversation</h1>}
                {updateSuccess === true && <p>Your reply has been sent!</p>}
                <form onSubmit={handleSubmit(handleFromSubmit)}>
                    <InputComponent
                        // value={prefillConversation.subject}
                        inputType="text"
                        inputName="subject"
                        inputId="subject-field"
                        inputLabel="Subject:"
                        validationRules={{
                            required: {
                                value: true,
                                message: 'Subject is required',
                            },
                            minLength: {
                                value: 2,
                                message: 'Subject must be at least 2 characters long',
                            },
                            maxLength: {
                                value: 100,
                                message: 'Subject may be a maximum of 1000 characters ',
                            },
                        }}
                        register={register}
                        errors={errors}
                    />

                    <label htmlFor="body-field`">
                        Body:
                        <textarea
                            // value={prefillConversation.body}
                            name="body"
                            id="body-field"
                            rows="4"
                            cols="50"
                            {...register("body", {
                                required: {
                                    value: true,
                                    message: 'You must enter a message',
                                },
                                minLength: {
                                    value: 3,
                                    message: 'Message must be at least 3 characters long',
                                },
                                maxLength: {
                                    value: 100000,
                                    message: 'Message may be a maximum of 100.000 characters ',
                                },
                            })}
                        >
                            </textarea>
                    </label>
                    <button type="submit">
                        {mode === 'create' && <h1>Create</h1>}
                        {mode === 'update' && <h1>Update</h1>}
                    </button>
                </form>
        </>
    );
}

export default ConversationForm;