import React, {useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import InputComponent from "../../otherComponents/others/InputComponent/InputComponent";
import styles from './UserReportForm.module.css';
import {PostRequest, PutRequest} from "../../../helpers/axiosHelper";
import {useParams} from "react-router-dom";
import Button from "../../otherComponents/buttons/Button/Button";

function UserReportForm({mode, type, prefillUserReport, user, demo, conversation}) {  // modes: many; types: 'user', 'demo' or 'conversation'
    const {username} = useParams()
    const [createSuccess, toggleCreateSuccess] = useState(false);

    console.log('mode: ', mode);
    console.log('type: ', type);
    console.log('prefillUserReport: ', prefillUserReport);

    const {handleSubmit, formState: {errors}, register, setValue} = useForm({
        mode: 'onTouched'
    });

    useEffect(() => {
        if (prefillUserReport) {
            switch (type) {
                case 'user':
                    setValue("subject", `About user "${user.username}"`);
                    break;
                case 'demo':
                    setValue("subject", `About demo "${demo.title}"`);
                    break;
                case 'conversation':
                    setValue("subject", `About demo "${conversation.subject}"`);
                    break;
            }
            setValue("body", prefillUserReport.body);
        }
    }, [prefillUserReport]);

    async function handleFormSubmit(data) {
        await createUserReport(data);
    }

    async function createUserReport({subject, body}) {
        let response = null;
        switch (type) {
            case 'user':
                response = await new PostRequest(`/userreports`, {
                    subject: subject,
                    body: body,
                    reporteUser: user
                }).invoke();
                break;
            case 'demo':
                response = await new PostRequest(`/userreports`, {
                    subject: subject,
                    body: body,
                    reportedDemo: demo
                }).invoke();
                break;
            case 'conversation':
                response = await new PostRequest(`/userreports`, {
                    subject: subject,
                    body: body,
                    reportedConversation: conversation
                }).invoke();

                break;
        }
        if (response.status === 201) {
            toggleCreateSuccess(true);
        }
        else console.error("Returned status from API call was not 201 Created");
    }


return (
    <>
        {prefillUserReport &&
            <form className='form' onSubmit={handleSubmit(handleFormSubmit)}>
                <div className='form-input'>
                    {type === 'demo' && <>
                        <h3>File your demo report</h3>
                        <h4>Let us know about cases of plagiarism or copyright infringement</h4>
                    </>}
                    {type === 'user' && <>
                        <h3>File your user report</h3>
                        <h4>Let us know about any inappropriate content or user misbehaviour</h4>
                    </>}


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
                    {<Button color='white' type="submit">Submit report</Button>}
                    {createSuccess === true && <p>Your report has been submitted!</p>}
                </div>
            </form>}
    </>
)
}

export default UserReportForm;