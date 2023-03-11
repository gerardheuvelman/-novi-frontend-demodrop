import React, {useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import InputComponent from "../../otherComponents/others/InputComponent/InputComponent";
import {AuthContext} from "../../../context/AuthContext";
import styles from './ConversationForm.module.css';
import {PostRequest, PutRequest} from "../../../helpers/axiosHelper";
import {useParams} from "react-router-dom";

function ConversationForm({mode, prefillConversation}) { // mode: 'create' or 'update'
    const {user} = useContext(AuthContext);
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

    async function handleFromSubmit(data) {
        if (mode === 'create') {
            await createConversation(data);
        } else if (mode === 'update') {
            await updateConversation(data);
        }
    }

    async function createConversation({subject, body}) {
        const response = await new PostRequest(`/conversations`, {
            subject: subject,
            body: body,
            demo: {demoId: prefillConversation.demo.demoId}
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
        <div className="page-container">
            {/*{mode === 'create' &&*/}
            {/*    <h4>{`Start a new conversation with user ${prefillConversation.producer.username} about demo ${prefillConversation.demo.title}`}</h4>}*/}
            {/*{mode === 'update' &&*/}
            {/*    <h4>{`Reply to user ${(user.username === prefillConversation.producer.username) ? prefillConversation.interestedUser.username : prefillConversation.producer.username}`}</h4>}*/}
            {prefillConversation &&
                <form onSubmit={handleSubmit(handleFromSubmit)}>
                    <>
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
                            Body:
                            <textarea
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
                        {<button type="submit">Send</button>}

                    </>
                </form>
            }
            {createSuccess === true && <p>Message has been sent!</p>}
            {updateSuccess === true && <p>Your reply has been sent!</p>}
        </div>
    );
}


export default ConversationForm;