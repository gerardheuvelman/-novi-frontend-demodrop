import React, {useContext, useState} from 'react';
import {useNavigate, NavLink, Link, useLocation} from 'react-router-dom';
import authContext, {AuthContext} from '../../../../../context/AuthContext';
import styles from './PrivateNavBar.module.css';

function PrivateNavBar() {
    const {isAuth, logout, user} = useContext(AuthContext);

    function getGreeting() {
        const date = new Date();
        const hours = date.getHours();

        if (hours >= 5 && hours < 12) {
            return "Good morning, ";
        } else if (hours >= 12 && hours < 18) {
            return "Good afternoon, ";
        } else if (hours >= 18 && hours < 22) {
            return "Good evening, ";
        } else {
            return "Good night, ";
        }
    }

    let roles;
    if (isAuth) {
        roles = user.authorities.map((authority) => {
            return authority.authority;
        })
    }

    return (
        <nav className='outer-container'>
            <div className='inner-container'>
                <ul>
                    <li><span> {getGreeting()} <strong>{`${user.username}!`}</strong>!</span></li>
                    <li><NavLink className={styles['link']} to={`/users/${user.username}/mydemos`}>My
                        demos</NavLink></li>
                    <li><NavLink className={styles['link']}
                                 to={`/users/${user.username}/myconversations`}>Inbox</NavLink>
                    </li>
                    <li><NavLink className={styles['link']} to={`/users/${user.username}/myprofile`}>My
                        profile</NavLink>
                    </li>
                    <li><NavLink className={styles['link']}
                                 to={`/users/${user.username}/favdemos`}>Favorites</NavLink>
                    </li>
                    {roles.includes("ROLE_ADMIN") &&
                        <li><NavLink className={styles['link']} to={`/admin`}>Admin Control Panel</NavLink>
                        </li>}
                </ul>
            </div>
        </nav>
    );
}

export default PrivateNavBar;