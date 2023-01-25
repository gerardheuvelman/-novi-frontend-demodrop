import React from 'react';
import './Header.css';
import NavBar from "../navbar/NavBar";

function Header({ children }) {
  return (
    <header className="outer-content-container">
      <div className="inner-content-container">
        <NavBar/>
        <div className="hero-content">
          {children}
        </div>
      </div>
    </header>
  );
}

export default Header;