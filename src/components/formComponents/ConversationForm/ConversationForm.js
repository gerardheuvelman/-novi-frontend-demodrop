import React, {useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import InputComponent from "../../otherComponents/others/InputComponent/InputComponent";
import {AuthContext} from "../../../context/AuthContext";
import styles from './ConversationForm.module.css';
import {PostRequest, PutRequest} from "../../../helpers/axiosHelper";
import {useParams} from "react-router-dom";
import Button from "../../otherComponents/buttons/Button/Button";

function ConversationForm({mode, type, prefillConversation, hasDemo}) {  // modes: 'admin' or others; types: 'create' or 'update'
    const {conversationId} = useParams();
    const [createSuccess, toggleCreateSuccess] = useState(false);
    const [updateSuccess, toggleUpdateSuccess] = useState(false);

    console.log('mode: ', mode);
    console.log('prefillConversation: ', prefillConversation);

    const {handleSubmit, formState: {errors}, register, watch, setValue} = useForm({
        mode: 'onTouched',
        // defaultValues: {     //WERKT NIET???
        //     subject: prefillConversation.subject,
        //     body: prefillConversation.body
        // }
    });

    useEffect(() => { // IK GEBRUIK NU DIT IN PLAATS VAN DEFAULTVALUES:
        if (prefillConversation) {
            setValue("subject", prefillConversation.subject);
            setValue("body", prefillConversation.body);
        }
    }, [prefillConversation])

    async function handleFormSubmit(data) {
        if (type === 'create') {
            await createConversation(data);
        } else if (type === 'update') {
            await updateConversation(data);
        }
    }

    async function createConversation({subject, body}) {
        const response = await new PostRequest(`/conversations`, {
            hasDemo: hasDemo,
            subject: subject,
            body: body,
            correspondent: prefillConversation.correspondent,
            demo: prefillConversation.demo
        }).invoke();
        if (response.status === 201) {
            toggleCreateSuccess(true);
            // navigate(`/users/${user.username}/conversations`);
        } else console.error("Returned status from API call was not 201 Created");
    }

    async function updateConversation({subject, body}) {
        console.log('conversationId just before making put request: ', conversationId);
        const response = await new PutRequest(`/conversations/${conversationId}`, {
            subject: subject,
            body: body,
        }).invoke();
        console.log('response from putrequest:', response);
        if (response.status === 200) {
            toggleUpdateSuccess(true);
            // navigate(`/users/${user.username}/conversations`);
        } else console.error("Returned status from API call was not 200 OK")
    }

    return (
        <>
            {prefillConversation &&
                <form className='form' onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className='form-input'>
                        <h3>Prepare your message</h3>
                        <InputComponent
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
                            <textarea
                                name="body"
                                id="body-field"
                                rows="20"
                                cols="70"
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
                    </div>
                    <div className='form-controls'>
                        <h3>Available actions</h3>
                        {<Button color='white' type="submit">Send message</Button>}
                        {createSuccess === true && <p>Message has been sent!</p>}
                        {updateSuccess === true && <p>Your reply has been sent!</p>}
                    </div>
                </form>}
        </>
    )
}


export default ConversationForm;