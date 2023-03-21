import React, {useContext} from 'react';
import PublicNavBar from "./PublicNavBar/PublicNavBar";
import styles from './Header.module.css';
import logo from '../../../../assets/DemoDropLogo.png';
import {NavLink} from "react-router-dom";
import PrivateNavBar from "./PrivateNavBar/PrivateNavBar";
import {AuthContext} from "../../../../context/AuthContext";

function Header({ children }) {
    const {isAuth} = useContext(AuthContext);
  return (
    <header className="outer-content-container" >
      <div className="inner-content-container">
          <NavLink to="/"><img src={logo} alt="DemoDrop header logo"/></NavLink>
          <PublicNavBar/>
          {isAuth && <PrivateNavBar/>}
        <div className="hero-content">
          {children}
        </div>
      </div>
    </header>
  );
}

export default Header;