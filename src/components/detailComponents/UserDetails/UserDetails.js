import {Link} from "react-router-dom";
import AccountStateToggleButton from "../../otherComponents/buttons/AccountStateToggleButton/AccountStateToggleButton";
import DeleteButton from "../../otherComponents/buttons/DeleteButton/DeleteButton";
import React from "react";
import styles from './UserDetails.module.css';

function UserDetails({userDetails, mode}) { // modes: 'anon','personal', 'owner' or 'admin'
    return <>
        <section>
            <h2>Personal details</h2>
            <p><strong>Username: </strong>{userDetails.username}</p>
            {(mode === 'owner' || mode === 'admin') && <p><strong>Email: </strong>{userDetails.email}</p>}
            {(mode === 'owner') && <p><Link to={`/users/${userDetails.username}/change-email`}>change email</Link></p>}
            {(mode === 'owner') && <p><Link to={`/users/${userDetails.username}/change-password`}>change password</Link></p>}
            {(mode === 'owner') && <p><DeleteButton entityName="user" entityId={userDetails.username} mode={mode}>Delete account (permanently!)</DeleteButton></p>}
        </section>
    </>;
}

export default UserDetails;