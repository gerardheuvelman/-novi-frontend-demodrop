import styles from './DeleteButton.module.css';
import React, {useContext, useState} from 'react';
import ModalMessageWindow from '../../Modals/ModalMessageWindow/ModalMessageWindow';
import {DeleteRequest} from "../../../../helpers/axiosHelper";
import ModalConfirmWindow from "../../Modals/ModalConfirmWindow/ModalConfirmWindow";
import {AuthContext} from "../../../../context/AuthContext";
import {useNavigate} from "react-router-dom";

function DeleteButton({entityName, entityId, friendlyId, mode, children}) {  // Modes: 'user','owner' or 'admin'
    const [showConfirm, setShowConfirm] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null)
    const {isAuth, user} = useContext(AuthContext)
    const navigate = useNavigate();

    console.log('DeleteButton entityName: ', entityName)
    console.log('DeleteButton entityId: ', entityId)
    console.log('DeleteButton mode: ', mode)

    function handleDelete() {
        setShowConfirm(true);
    }

    function cancelDelete() {
        setShowConfirm(false);
    }

    async function confirmDelete() {
        await deleteEntityAsync();
        setShowConfirm(false);
        setShowMessage(true);
    }

    async function deleteEntityAsync() {
        const response = await new DeleteRequest(`/${entityName}s/${entityId}`).invoke();
        setResponseMessage(response.data);
    }

    function handleClose() {
        setShowMessage(false);
        if (mode === 'admin') {
            navigate(`/admin/${entityName}s`);
        }
        if (mode === 'owner'){
            navigate(`/users/${user.username}/${entityName}s`);
        }
        if (mode === 'user'){
            navigate(`/${entityName}s`);
        }
    }

    console.log('DeleteButton responseMessage: ',responseMessage);
    return (
        <>
            <button type='button' onClick={handleDelete}>
                {children}
            </button>
            {showConfirm &&
                <ModalConfirmWindow onCancel={cancelDelete} OnConfirm={confirmDelete}>
                    {`You are about to permanently  delete ${entityName} "${friendlyId}". `}
                    Are you sure?
                </ModalConfirmWindow>
            }
            {(showMessage && mode === 'admin') &&
                <ModalMessageWindow onClose={handleClose}>
                    {`${responseMessage}\nPress the button to return to the list of ${entityName}s (admin mode)`}
                </ModalMessageWindow>
            }
            {(showMessage && isAuth && mode === 'owner') &&
                <ModalMessageWindow onClose={handleClose}>
                    {`${responseMessage}\nPress the button to return to your personal list of ${entityName}s`}
                </ModalMessageWindow>
            }
            {(showMessage && mode === 'user') &&
                <ModalMessageWindow onClose={handleClose}>
                    {`${responseMessage}\nPress "Close" to return to the full list of ${entityName}s`}
                </ModalMessageWindow>
            }
        </>
    );
}

export default DeleteButton;