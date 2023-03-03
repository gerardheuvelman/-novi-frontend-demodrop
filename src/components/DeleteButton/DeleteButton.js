import styles from './DeleteButton.module.css';
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import ModalMessageWindow from '../ModalMessageWindow/ModalMessageWindow';
import {DeleteRequest} from "../../helpers/axiosHelper";

function DeleteButton({username, entitiesName, entityId, mode, children}) {  // !entities must be plural! Mode: 'anon','user','owner' or 'admin'
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const token = localStorage.getItem( 'token' );

    async function deleteEntityAsync() {
        const response = await new DeleteRequest(`/${entitiesName}/${entityId}`).invoke();
        if (response.status === 200) {
            setShowModal(true);
        } else console.error("Returned status from API call was NOT 200 OK");
    }

    return (
        <>
            <button onClick={deleteEntityAsync}>
                {children}
            </button>
            {(showModal && mode === 'admin') &&
                <ModalMessageWindow redirectRoute={`/admin/${entitiesName}`}>
                    {`Deletion successful. Press the button to return to the Admin list of ${entitiesName}`}
                </ModalMessageWindow>
            }
            {(showModal && mode === 'personal') &&
                <ModalMessageWindow redirectRoute={`/users/${username}/${entitiesName}`}>
                    {`Deletion successful. Press the button to return to your personal list of ${entitiesName}`}
                </ModalMessageWindow>
            }
            {(showModal && mode === 'all') &&
                <ModalMessageWindow redirectRoute={`/${entitiesName}`}>
                    {`Deletion successful. Press the button to return to the full list of ${entitiesName}`}
                </ModalMessageWindow>
            }

        </>
    );
}

export default DeleteButton;