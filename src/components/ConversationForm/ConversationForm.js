import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from 'react-hook-form';
import InputComponent from "../../components/InputComponent/InputComponent";
import {AuthContext} from "../../context/AuthContext";
import styles from './ConversationForm.module.css';

function ConversationForm({demo, mode, prefillConversation}) {
    const {user} = useContext(AuthContext);
    const [createSuccess, toggleCreateSuccess] = useState(false);
    const [updateSuccess, toggleUpdateSuccess] = useState(false);
    const storedToken = localStorage.getItem("token");
    const [emailSuccess, toggleEmailSuccess] = useState(false);
    const [recipient, setRecipient] = useState(null);

    console.log('demo: ',demo);
    console.log('mode: ', mode);
    console.log('prefillConversation: ', prefillConversation);

    const {handleSubmit, formState: {errors}, register, watch, setValue} = useForm({
        mode: 'onTouched',
        // defaultValues: {     //WERKT NIET???
        //     subject: prefillConversation.subject,
        //     body: prefillConversation.body
        // }
    });

    // SET THE RECIPIENT
    useEffect(()=> {
        setRecipient(user.email);
        }, []);

    useEffect(()=> { // IK GEBRUIK NU DIT IN PLAATS VAN DEFAULTVALUES:
        if (prefillConversation) {
            setValue("subject", prefillConversation.subject );
            setValue("body", prefillConversation.body);
        }
    }, [prefillConversation])

    async function handleFromSubmit(data) {
        if (mode === 'create') {
            await createConversation(data);
        } else if (mode === 'update') {
            await updateConversation(data);
        }
        await sendNewMessageEmail();
    }

    async function createConversation({subject, body}) {
        try {
            const response = await axios.post('http://localhost:8080/conversations', {
                subject: subject,
                body: body,
                demo: {demoId: demo.demoId}
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedToken}`,
                }
            });
            console.log('axios.post(http://localhost:8080/conversations yields the following response: ', response);
            toggleCreateSuccess(true);
            // if (response.status === 201) {
            //     navigate(`/users/${user.username}/conversations`);
            // } else console.error("Returned status from API call was not 201 Created")

        } catch (e) {
            console.error(e);
        }
    }

    async function updateConversation({subject, body}) {
        try {
            const response = await axios.put(`http://localhost:8080/conversations/${prefillConversation.conversationId}`, {
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
            // if (response.status === 200) {
            //     navigate(`/users/${user.username}/conversations`);
            // } else console.error("Returned status from API call was not 200 OK")

        } catch (e) {
            console.error(e);
        }
    }

    async function sendNewMessageEmail() {
        const controller = new AbortController();
        const storedToken = localStorage.getItem("token");
        try {
            const response = await axios.post(`http://localhost:8080/email/sendsimple`,{
                recipient:user.email,
                msgBody: `You have received a new message from ${user.email}. please log in to DemoDrop to read it.\n`,
                subject:'A new message for you.'
            } , {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedToken}`,
                },
                signal: controller.signal
            });
            console.log('POST http://localhost:8080/email/sendsimple yielded the following response: ', response);
            toggleEmailSuccess(true);
        } catch (e) {
            console.log(e)
        }
        return function cleanup() {
            controller.abort(); // <--- cancel request
            console.log("Cleanup has been executed")
        }
    }

    return (
        <>
            {mode === 'create' && <h4>{`Start a new conversation with user ${prefillConversation.producer.username} about demo ${demo.title}`}</h4>}
            {mode === 'update' && <h4>{`Reply to user ${(user.username === prefillConversation.producer.username) ?  prefillConversation.interestedUser.username : prefillConversation.producer.username}`}</h4>}
            <form onSubmit={handleSubmit(handleFromSubmit)}>
                    {prefillConversation &&
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
                            <button type="submit">
                                <h1>Send</h1>
                            </button>

                        </>
                    }
                </form>
            {createSuccess === true && <p>Message has been sent!</p>}
            {updateSuccess === true && <p>Your reply has been sent!</p>}
            {emailSuccess === true && <p>{`An email has been sent to the recipient of this message: ${user.email}!`}</p>}
        </>
    );
}

export default ConversationForm;