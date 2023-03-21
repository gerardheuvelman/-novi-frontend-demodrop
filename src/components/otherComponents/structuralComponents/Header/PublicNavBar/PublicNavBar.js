import React, {useContext, useState} from 'react';
import {useNavigate, NavLink, Link, useLocation} from 'react-router-dom';
import authContext, {AuthContext} from '../../../../../context/AuthContext';
import styles from './PublicNavBar.module.css';
import {useHistory} from "react-router-dom";
import logo from '../../../../../assets/DemoDropLogo.png';
import InputComponent from "../../../others/InputComponent/InputComponent";


function PublicNavBar() {
    const {isAuth, logout, user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const location = useLocation();

    function handleSubmit(e) {
        e.preventDefault();
        console.log('handleSubmit executed...');
        const urlSearchParams = new URLSearchParams({ query });
        console.log('Navbar urlSearchParams: ',urlSearchParams)
        navigate(`/demos/find?${urlSearchParams.toString()}`);
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
                    <li><NavLink className={styles['link']} to="/">Home</NavLink></li>
                    {isAuth && <li><NavLink className={styles['link']} to="/demos">Demo list</NavLink></li>}
                    {!isAuth && <li><NavLink className={styles['link']} to="/demos">Our demos</NavLink></li>}
                    <li><NavLink className={styles['link']} to="/genres">Genres</NavLink></li>
                    <li>
                        <form onSubmit={handleSubmit}>
                            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                                   placeholder="Enter query..."/>
                            <button type="submit">Search Demos</button>
                        </form>
                    </li>
                    <li><NavLink className={styles['link']} to="/demos/drop">Drop new demo</NavLink></li>
                    {isAuth ?
                        <>
                            <li>
                                <button className={styles['link']} type="button" onClick={logout}>Log out</button>
                            </li>
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

export default PublicNavBar;