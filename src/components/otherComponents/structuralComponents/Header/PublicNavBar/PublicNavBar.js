import React, {useContext, useState} from 'react';
import {useNavigate, NavLink, Link, useLocation} from 'react-router-dom';
import authContext, {AuthContext} from '../../../../../context/AuthContext';
import styles from './PublicNavBar.module.css';
import Button from "../../../buttons/Button/Button";


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
                        <form className={styles['query-form']} onSubmit={handleSubmit}>
                            <input className={styles['query-input']} type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                                   placeholder="Enter query..."/>
                            <Button color='red' type="submit">Search Demos</Button>
                        </form>
                    </li>
                    <li><NavLink className={styles['link']} to="/demos/drop">Drop new demo</NavLink></li>
                    {isAuth ?
                        <>
                            <li>
                                <Button color='red' type="button" onClick={() => logout('/')}>Log out</Button>
                            </li>
                        </>
                        :
                        <>
                            <li>
                                <Button color='red' type="button" onClick={() => navigate('/login')}>Log in</Button>
                                <Button color='red' type="button" onClick={() => navigate('/register')}>Register</Button>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    );
}

export default PublicNavBar;