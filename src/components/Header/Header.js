import React from 'react';
import NavBar from "../NavBar/NavBar";
import styles from './Header.module.css';
import logo from '../../assets/DemoDropLogo.png';
import {NavLink} from "react-router-dom";


function Header({ children }) {
  return (
    <header className="outer-content-container" >
      <div className="inner-content-container">
          <NavLink to="/"><img src={logo} alt="DemoDrop header logo"/></NavLink>
          <NavBar/>
        <div className="hero-content">
          {children}
        </div>
      </div>
    </header>
  );
}

export default Header;