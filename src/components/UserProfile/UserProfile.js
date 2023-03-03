import {Link} from "react-router-dom";
import AccountStateToggleButton from "../AccountStateToggleButton/AccountStateToggleButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import React from "react";
import styles from './UserProfile.module.css';

function UserProfile({userDetails, mode}) {
    return <>
        <section>
            <h2>Personal details</h2>
            <p><strong>Username: </strong>{userDetails.username}</p>
            <p><strong>Email: </strong>{userDetails.email}</p>
            <p><Link to={`/users/${userDetails.username}/change-email`}>change email</Link></p>
            <p><Link to={`/users/${userDetails.username}/change-password`}>change password</Link></p>
            <p><DeleteButton entitiesName="users" entityId={userDetails.username} mode="admin">Delete this
                account (permanently!)</DeleteButton></p>
            <p>Back to the <Link to="/">Home page</Link></p>
        </section>
        {mode === "admin" && <section>
            {<p><AccountStateToggleButton user={userDetails}/></p>}
            {<p>Back to the <Link to="/admin/users">Admin user List</Link></p>}
        </section>}
    </>;
}

export default UserProfile;