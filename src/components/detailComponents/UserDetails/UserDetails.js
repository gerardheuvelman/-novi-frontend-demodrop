import {Link} from "react-router-dom";
import AccountStateToggleButton from "../../otherComponents/buttons/AccountStateToggleButton/AccountStateToggleButton";
import DeleteButton from "../../otherComponents/buttons/DeleteButton/DeleteButton";
import React from "react";
import styles from './UserDetails.module.css';

function UserDetails({userDetails, mode}) { // modes: 'anon','personal', 'owner' or 'admin'
    return (
        <>
            {userDetails &&
                <section className='details-section'>
                    <article className='details-info'>
                        <h3>Personal details</h3>
                        <span>
                            <strong>Username: </strong>{userDetails.username}
                        </span>
                        {(mode === 'owner' || mode === 'admin') &&
                            <span>
                                <strong>Email: </strong>{userDetails.email}
                            </span>}
                    </article>
                    <article className='details-controls'>
                        {(mode === 'owner') &&
                            <Link to={`/users/${userDetails.username}/change-email`}>change email</Link>}
                        {(mode === 'owner') &&
                            <Link to={`/users/${userDetails.username}/change-password`}>change password</Link>}
                        {(mode === 'owner') &&
                            <DeleteButton
                                color='white'
                                entityName="user"
                                entityId={userDetails.username}
                                friendlyId={userDetails.username}
                                mode={mode}
                            >Delete my account (permanently!)
                            </DeleteButton>}
                        {mode === 'admin' &&
                            <Link to={`/admin/users/${userDetails.username}/edit`}>Edit this user</Link>}
                        {(mode === 'admin') &&
                            <DeleteButton
                                color='white'
                                entityName="user"
                                entityId={userDetails.username}
                                friendlyId={userDetails.username}
                                mode={mode}
                            >Delete this user
                            </DeleteButton>}
                        {mode === 'admin' && <AccountStateToggleButton user={userDetails}/>}
                        {mode === 'admin' && <span>
                                Back to the <Link to="/admin/users">Admin user List</Link>
                            </span>}
                    </article>
                </section>}

        </>);
}

export default UserDetails;