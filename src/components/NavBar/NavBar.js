import React, {useContext, useState} from 'react';
import {useNavigate, NavLink, Link} from 'react-router-dom';
import authContext, {AuthContext} from '../../context/AuthContext';
import styles from './NavBar.module.css';
import logo from '../../assets/DemoDropLogo.png';

function NavBar() {
    const {isAuth, logout, user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [mobileMenu, toggleMobileMenu] = useState(true)

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
        roles = user.authorities.map ((authority) =>{
            return authority.authority;
        })
    }

    return (
        <nav className='outer-container'>
            <div className='inner-container'>
                <ul>
                    <li><NavLink className={styles['link']} to="/demos">Demo list</NavLink></li>
                    <li><NavLink className={styles['link']} to="/demos/drop">Drop new demo</NavLink></li>
                    {isAuth ?
                        <>
                            <li><span> {getGreeting()} <strong>{`${user.username}!`}</strong>!</span></li>
                            <li><NavLink className={styles['link']} to={`/users/${user.username}/demos`}>My demos</NavLink></li>
                            <li><NavLink className={styles['link']} to={`/users/${user.username}/conversations`}>Inbox</NavLink>
                            </li>
                            <li><NavLink className={styles['link']} to={`/users/${user.username}/myprofile`}>My profile</NavLink>
                            </li>
                            <li><NavLink className={styles['link']} to={`/users/${user.username}/favdemos`}>Favorites</NavLink>
                            </li>
                            <li>
                                <button className={styles['link']} type="button" onClick={logout}>Log out</button>
                            </li>

                            {roles.includes("ROLE_ADMIN") &&
                                <li><NavLink className={styles['link']} to={`/admin`}>Admin Control Panel</NavLink></li>}
                        </>
                        :
                        <>
                            <li>
                                <button type="button" onClick={() => navigate('/login')}>Log in</button>
                                <button type="button" onClick={() => navigate('/register')}>Register</button>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;