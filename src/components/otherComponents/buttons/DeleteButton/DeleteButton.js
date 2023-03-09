import styles from './DeleteButton.module.css';
import React, {useContext, useState} from 'react';
import ModalMessageWindow from '../../Modals/ModalMessageWindow/ModalMessageWindow';
import {DeleteRequest} from "../../../../helpers/axiosHelper";
import ModalConfirmWindow from "../../Modals/ModalConfirmWindow/ModalConfirmWindow";
import {AuthContext} from "../../../../context/AuthContext";

function DeleteButton({entityName, entityId, mode, children}) {  // Modes: 'anon','user','owner' or 'admin'
    const [showConfirm, setShowConfirm] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null)
    const {isAuth, user} = useContext(AuthContext)

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
        const response = await new DeleteRequest(`/${entityName}s/${entityId}`).invoke();
        setResponseMessage(response);
    }

    return (
        <>
            <button onClick={handleClick}>
                {children}
            </button>
            {showConfirm &&
                <ModalConfirmWindow cancelCallback={cancelDelete} confirmCallback={confirmDelete}>
                    {`You are about to permanently  delete ${entityName} "${entityId}". `}

                    Are you sure?
                </ModalConfirmWindow>
            }
            {(showMessage && mode === 'admin') &&
                <ModalMessageWindow redirectRoute={`/admin/${entityName}s`}>
                    {`${responseMessage}\nPress the button to return to the list of ${entityName}s (admin mode)`}
                </ModalMessageWindow>
            }
            {(showMessage && isAuth && mode === 'owner') &&
                <ModalMessageWindow redirectRoute={`/users/${user.username}/${entityName}s`}>
                    {`${responseMessage}\nPress the button to return to your personal list of ${entityName}s`}
                </ModalMessageWindow>
            }
            {(showMessage && mode === 'all') &&
                <ModalMessageWindow redirectRoute={`/${entityName}s`}>
                    {`${responseMessage}\nPress the button to return to the full list of ${entityName}s`}
                </ModalMessageWindow>
            }
        </>
    );
}

export default DeleteButton;