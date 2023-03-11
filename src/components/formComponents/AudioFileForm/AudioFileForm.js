import React, {useContext, useState} from 'react';
import InputComponent from "../../otherComponents/others/InputComponent/InputComponent";
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {PostRequest, PutRequest} from "../../../helpers/axiosHelper";
import {AuthContext} from "../../../context/AuthContext";
import styles from './AudioFileForm.module..css';
import SubmitFormButton from "../../otherComponents/ConfirmForm/ConfirmForm";
import ConfirmForm from "../../otherComponents/ConfirmForm/ConfirmForm";

function AudioFileForm({mode, type, prefillAudioFile}) { // modes : 'admin; types: 'create', or 'update'
    const audioFileId = useParams()
    const [createSuccess, toggleCreateSuccess] = useState(false);
    const [updateSuccess, toggleUpdateSuccess] = useState(false);
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const {handleSubmit, formState: {errors}, register, watch} = useForm({
        mode: 'onTouched',
        defaultValues: {
            'audioFileId': prefillAudioFile.audioFileId,
            'createdDate': prefillAudioFile.createdDate,
            'originalFileName': prefillAudioFile.originalFileName,
            'demo': prefillAudioFile.demo
        }
    });

    console.log('mode for AudioFileForm: ', mode);
    console.log('prefillAudioFile for AudioFileForm: ', prefillAudioFile);

    function handleConfirmFormSubmit(data) {
        if (type === 'create') {
            void CreateAudioFileAsync(data);
        }
        if (type === 'update') {
            void updateAudioFileAsync(data)
        }
    }

    async function CreateAudioFileAsync({fileName, demo}) {
        const response = await new PostRequest('/audiofiles', {
            originalFileName: fileName,
            demo: demo
        }).invoke();
        if (response.status === 201) {
            toggleCreateSuccess(true);
            if (mode === 'admin') {
                navigate(`/admin/audiofiles`);
            }
        } else console.error("Returned status from API call was not 201 Created");
    }

    async function updateAudioFileAsync({fileName}) {
        const response = await new PutRequest(`/audiofiles/${audioFileId}`, {
            originalFileName: fileName
        }).invoke();
        if (response.status === 200) {
            if (mode === 'admin') { // "Edit Audiofile" is only used in admin mode
                toggleUpdateSuccess(true);
                navigate(`/admin/audiofiles/${audioFileId}`);
            }
        } else console.error("Returned status from API call was not 201 Created");
    }

    const defaultValues = {
        'originalFileName': prefillAudioFile.originalFileName,
    }

    return (
        <div className="page-container">
            {prefillAudioFile &&
                <ConfirmForm defaultValues={defaultValues} mode={mode} type={type} entityName='audiofile'
                             entityId={prefillAudioFile.audioFileId} friendlyId={prefillAudioFile.originalFileName} onSubmit={handleConfirmFormSubmit}  >
                    <InputComponent
                        inputType='text'
                        inputName="fileName"
                        inputId="filename-field"
                        inputLabel="New file name: "
                        validationRules={{
                            required: {
                                value: true,
                                message: ' A valid file name is required',
                            }
                        }}
                        register={register}
                        errors={errors}
                    />
                </ConfirmForm>
            }
            {/*{createSuccess === true && <p>A new audio file has been created!</p>}*/}
            {/*{updateSuccess === true && <p>This audio file has been successfully updated!</p>}*/}
        </div>
    );
}

export default AudioFileForm;