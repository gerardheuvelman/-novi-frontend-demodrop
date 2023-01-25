import React, {useContext} from 'react';
// import logo from '../../assets/DemoDropLogo.png';
import {useNavigate, NavLink} from 'react-router-dom';
import authContext, {AuthContext} from '../../context/AuthContext';
import {ReactComponent as LogoShort} from '../../assets/google-logo.svg';

function NavBar() {
    const {isAuth, logout, user} = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <nav>
            <ul>
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
                <li><NavLink to="/demos">Demo list</NavLink></li>
                <li><NavLink to="/demos/drop">Drop new demo</NavLink></li>
            </ul>
            {isAuth ?
                <>
                    <li>
                        <span>{user.email}</span>
                    </li>
                    <li>
                        <NavLink to={`/users/${authContext.username}/conversations`}>Inbox</NavLink>
                    </li>
                    <li>
                        <NavLink to={`/users/${authContext.username}`}>My profile</NavLink>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={logout}
                        >
                            Log out
                        </button>
                    </li>
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
    );
}

export default NavBar;