import {Link} from "react-router-dom";
import AccountStateToggleButton from "../../otherComponents/buttons/AccountStateToggleButton/AccountStateToggleButton";
import DeleteButton from "../../otherComponents/buttons/DeleteButton/DeleteButton";
import React from "react";
import styles from './UserDetails.module.css';
import {DateTime} from "../../../helpers/dateTimeHelper";

function UserDetails({userDetails, mode}) { // modes: 'anon','personal', 'owner' or 'admin'
    const dateTimeCreated = new DateTime(userDetails.createdDate);
    const createdDate = dateTimeCreated.getDateString();
    const createdTime = dateTimeCreated.getTimeString();

    return (
        <>
            {userDetails &&
                <section className='details-section'>
                    <article className='details-info'>
                        <h4>Personal details</h4>
                        <span>
                            <strong>Username: </strong>{userDetails.username}
                        </span>
                        <span>
                        <strong>Joined: </strong>{createdDate}
                        </span>
                        {(mode === 'owner' || mode === 'admin') &&
                            <span>
                                <strong>Email: </strong>{userDetails.email}
                            </span>}
                    </article>
                    <article className='details-controls'>
                        <h3>Available actions</h3>
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
                                type='single'
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
                                type='single'
                            >Delete this user
                            </DeleteButton>}
                        {mode === 'admin' && <AccountStateToggleButton user={userDetails}/>}
                        {(mode !== 'anon' && mode !== 'owner' && mode !== 'admin') &&
                                <Link to={`/users/${userDetails.username}/sendmessage`}>Message this user</Link>}
                        {mode === 'admin' &&
                            <Link to={`/admin/users${userDetails.username}/sendmessage`} >Message this user (admin mode)</Link>}
                        {(mode !== 'anon' && mode !== 'owner' && mode !== 'admin') &&
                            <Link to={`/users/${userDetails.username}/report`}>Report this user</Link>}
                        {mode === 'admin' &&
                            <span>
                                Back to the <Link to="/admin/users">Admin user List</Link>
                            </span>}
                    </article>
                </section>}

        </>);
}

export default UserDetails;