import React, {useContext, useState} from 'react';
// import logo from '../../assets/DemoDropLogo.png';
import {useNavigate, NavLink, Link} from 'react-router-dom';
import authContext, {AuthContext} from '../../context/AuthContext';
import {ReactComponent as LogoShort} from '../../assets/google-logo.svg';
import styles from './NavBar.module.scss';

function NavBar() {
    const {isAuth, logout, user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [mobileMenu, toggleMobileMenu] = useState(true)

    function showMobileMenu() {
        toggleMobileMenu(prev => !prev)
    }

    return (
        <div className="outer-container navbar">
            <nav className="inner-container">
                <button className="toggle-menu" type="button" onClick={ showMobileMenu }>
                    {
                        mobileMenu
                            ? <span className="material-symbols-outlined">menu</span>
                            : <span className="material-symbols-outlined">close</span>
                    }
                </button>
                <ul className={ mobileMenu ? "menu" : "mobile-menu" }>
                    <li>
                        <NavLink to="/">
                          <span className="logo-container">
                            <LogoShort/>
                            <h3>
                              DemoDrop home
                            </h3>
                          </span>
                        </NavLink>
                    </li>
                    <li><NavLink className={ ( { isActive } ) => isActive ? "link--active" : "link--default" } to="/demos">Demo list</NavLink></li>
                    <li><NavLink className={ ( { isActive } ) => isActive ? "link--active" : "link--default" } to="/demos/drop">Drop new demo</NavLink></li>
                </ul>
                {isAuth ?
                    <>
                        <li>
                            <span className={ ( { isActive } ) => isActive ? "link--active" : "link--default" } >{user.email}</span>
                        </li>
                        <li>
                            <NavLink className={ ( { isActive } ) => isActive ? "link--active" : "link--default" } to={`/users/${user.username}/demos`}>My demos</NavLink>
                        </li>
                        <li>
                            <NavLink className={ ( { isActive } ) => isActive ? "link--active" : "link--default" } to={`/users/${user.username}/conversations`}>Inbox</NavLink>
                        </li>
                        <li>
                            <NavLink className={ ( { isActive } ) => isActive ? "link--active" : "link--default" } to={`/users/${user.username}/profile`}>My profile</NavLink>
                        </li>
                        <li>
                            <NavLink className={ ( { isActive } ) => isActive ? "link--active" : "link--default" } to={`/users/${user.username}/favdemos`}>Favorites</NavLink>
                        </li>
                        <li>
                            <button className={ ( { isActive } ) => isActive ? "link--active" : "link--default" }
                                type="button"
                                onClick={logout}
                            >
                                Log out
                            </button>
                        </li>
                        {user.authority === 'ROLE_ADMIN' &&
                            <li><NavLink className={ ( { isActive } ) => isActive ? "link--active" : "link--default" } to={`/admin`}>Admin Control Panel</NavLink></li>}
                    </>
                    :
                    <>
                        <li>
                            <button

                                type="button"
                                onClick={() => navigate('/login')}
                            >
                                Log in
                            </button>
                            <Link className="mobile-login" to="login">
                                <span className="material-symbols-outlined">person</span>
                            </Link>

                            <button
                                type="button"
                                onClick={() => navigate('/register')}
                            >
                                Register
                            </button>
                        </li>
                    </>
                }
            </nav>
        </div>

    );
}

export default NavBar;