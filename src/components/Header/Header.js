import React from 'react';
import NavBar from "../NavBar/NavBar";
import styles from './Header.module.scss';

function Header({ children }) {
  return (
    <header className="outer-content-container" >
      <div className="inner-content-container">
        <NavBar/>
        <div className="hero-content">
            test
          {children}
        </div>
      </div>
    </header>
  );
}

export default Header;