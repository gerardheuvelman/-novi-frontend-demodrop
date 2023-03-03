import styles from './AccountStateToggleButton.module.css';
import React, {useEffect, useState} from 'react';
import {GetRequest, PatchRequest} from "../../helpers/axiosHelper";

function AccountStateToggleButton({user}) {
    console.log('user: ',user)
    const [accountStatus, toggleAccountStatus] = useState(user.enabled);
    console.log('accountStatus: ', accountStatus)

    async function submitAccountStatus(desiredStatus) {
        const response = await new PatchRequest(`/users/${user.username}/setstatus?status=${desiredStatus}`).invoke();
        toggleAccountStatus(response.data);
    }

    return (
            <span>
                {console.log('accountStatus: ', accountStatus)}
                {accountStatus? "Account is enabled " : "Account is disabled " }
                <button type={"button"} onClick={() => submitAccountStatus(!accountStatus)}>{accountStatus? "Press to disable" : "Press to enable" }</button>
            </span>
    );
}

export default AccountStateToggleButton;