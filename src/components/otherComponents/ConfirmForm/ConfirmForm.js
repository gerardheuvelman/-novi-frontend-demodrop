import styles from './ConfirmForm.module.css';
import React, {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../../context/AuthContext";
import {PostRequest, PutRequest} from "../../../helpers/axiosHelper";
import ModalConfirmWindow from "../Modals/ModalConfirmWindow/ModalConfirmWindow";
import ModalMessageWindow from "../Modals/ModalMessageWindow/ModalMessageWindow";

function ConfirmForm({entityName, entityId, friendlyId, mode, type, onSubmit, children}) {  // Modes: 'user','owner' or 'admin'; types: 'create' or 'update'
    const [showConfirm, setShowConfirm] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({hello: 'world'});
    const [responseEntity, setResponseEntity] = useState(null)
    const {isAuth, user} = useContext(AuthContext)
    const navigate = useNavigate();
    const {handleSubmit} = useForm();

    console.log('ConfirmForm entityName: ', entityName)
    console.log('ConfirmForm entityId: ', entityId)
    console.log('ConfirmForm mode: ', mode)
    console.log('ConfirmForm type: ', type)

    function handleFormSubmit(data) {
        console.log('data in handleFormSubmit: ', data )
        setFormData(data);
        setShowConfirm(true);
    }

    function cancelFormSubmit() {
        setShowConfirm(false);
    }

    async function handleConfirmFormSubmit(data) {
        console.log('data in confirmFormSubmit: ', data )
        // return data to parent
        onSubmit(data);
        await sendApiRequestAsync();
        setShowConfirm(false);
        setShowMessage(true);
    }

    async function sendApiRequestAsync() {
        let response;
        if (type === 'create') {
            response = await new PostRequest(`/${entityName}s/`,       ).invoke();
        } else if (type === 'update') {
            response = await new PutRequest(`/${entityName}s/${entityId}`,       ).invoke();
        } else console.error('property "type" is invalid')
        setResponseEntity(response.data);
    }

    function handleClose() {
        setShowMessage(false);
        if (mode === 'admin') {
            switch (entityName) {
                case 'user':
                    navigate(`/admin/users/${responseEntity.username}`);
                    break;
                case 'demo':
                    navigate(`/admin/demos/${responseEntity.demoId}`);
                    break;
                case 'conversation':
                    navigate(`/admin/conversations/${responseEntity.conversationId}`);
                    break;
                case 'audiofile':
                    navigate(`/admin/audiofiles/${responseEntity.audioFileId}`);
                    break;
                case 'genre':
                    navigate(`/admin/genres/${responseEntity.name}`);
                    break;
                default:  navigate(`/pagenotfound}`);

            }
        } else {
            switch (entityName) {
                case 'user':
                    navigate(`/users/${responseEntity.username}`);
                case 'demo':
                    navigate(`/demos/${responseEntity.demoId}`);
                case 'conversation':
                    navigate(`/conversations/${responseEntity.conversationId}`);
                case 'audiofile':
                    navigate(`/audiofiles/${responseEntity.audioFileId}`);
                case 'genre':
                    navigate(`/genres/${responseEntity.name}`);
            }
        }
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    console.log('ConfirmForm responseEntity: ', responseEntity);
    return (
        <>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                {children}
                <button type='submit'>
                    {capitalizeFirstLetter(type)}
                </button>
            </form>
            {showConfirm &&
                <ModalConfirmWindow formData={formData} cancelCallback={cancelFormSubmit} confirmCallback={handleConfirmFormSubmit}>
                    {`You have entered the following info:\n`}

                    {`Do you want to submit this ${entityName}?`}
                </ModalConfirmWindow>}
            {showMessage &&
                <ModalMessageWindow onClose={handleClose}>
                    {`The following ${entityName} was stored:\n ${responseEntity}\nPress ""Close" to View it`}
                </ModalMessageWindow>}
        </>
    );
}

export default ConfirmForm;