import styles from './AccountStateToggleButton.module.css';

import React, {useEffect, useState} from 'react';
import axios from "axios";
import {GetRequest, PatchRequest} from "../../helpers/axiosHelper";

function AccountStateToggleButton({username}) {
    const [accountStatus, toggleAccountStatus] = useState(null);

    useEffect(() => {
        async function fetchAccountStatus() {
            const response = await new GetRequest(`/users/${username}/getstatus`).invoke();
            toggleAccountStatus(response.data);
        }
    }, []);

    async function submitAccountStatus(desiredStatus) {
        const response = await new PatchRequest(`/users/${username}/setstatus?status=${desiredStatus}`).invoke();
        toggleAccountStatus(response.data);
    }

    return (
        <>
            <button type={"button"} onClick={() => submitAccountStatus(!accountStatus)}>{accountStatus? "Account is currently ENABLED. Press to disable" : "Account is currently DISABLED. press to enable" }</button>
        </>
    );

}

export default AccountStateToggleButton;