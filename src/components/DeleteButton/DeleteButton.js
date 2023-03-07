import styles from './DeleteButton.module.css';
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import ModalMessageWindow from '../ModalMessageWindow/ModalMessageWindow';
import {DeleteRequest} from "../../helpers/axiosHelper";
import ModalConfirmWindow from "../ModalConfirmWindow/ModalConfirmWindow";

function DeleteButton({username, entitiesName, entityId, mode, children}) {  // !entities must be plural! Mode: 'anon','user','owner' or 'admin'
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null)
    const token = localStorage.getItem('token');

    async function handleClick() {
        setShowConfirm(true);
    }

    async function cancelDelete() {
        setShowConfirm(false);
    }

    async function confirmDelete() {
        const responseMessage = await deleteEntityAsync();
        setShowConfirm(false);
        setShowMessage(true);
    }

    async function deleteEntityAsync() {
        const response = await new DeleteRequest(`/${entitiesName}/${entityId}`).invoke();
        setResponseMessage(response);
    }

    return (
        <>
            <button onClick={handleClick}>
                {children}
            </button>
            {showConfirm &&
                <ModalConfirmWindow cancelCallback={cancelDelete} confirmCallback={confirmDelete}>
                    {`You are about to (permanently  delete ${entitiesName} `}
                </ModalConfirmWindow>
            }
            {(showMessage && mode === 'admin') &&
                <ModalMessageWindow redirectRoute={`/admin/${entitiesName}`}>
                    {`${responseMessage}\nPress the button to return to the list of ${entitiesName} (admin mode)`}
                </ModalMessageWindow>
            }
            {(showMessage && mode === 'personal') &&
                <ModalMessageWindow redirectRoute={`/users/${username}/${entitiesName}`}>
                    {`${responseMessage}\nPress the button to return to your personal list of ${entitiesName}`}
                </ModalMessageWindow>
            }
            {(showMessage && mode === 'all') &&
                <ModalMessageWindow redirectRoute={`/${entitiesName}`}>
                    {`${responseMessage}\nPress the button to return to the full list of ${entitiesName}`}
                </ModalMessageWindow>
            }
        </>
    );
}

export default DeleteButton;