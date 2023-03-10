import React from 'react';
import styles from './Footer.module.css';


function Footer({children}) {
    return (
        <footer className="outer-content-container">
            <div className="inner-content-container">
                In opdracht van NOVI Hogeschool © 2023
            </div>
            {children}
        </footer>

    );
}

export default Footer;