import React from 'react';
import styles from './Footer.module.css';
import {Link} from "react-router-dom";


function Footer({children}) {
    return (
        <footer className="outer-content-container">
            <span>
                In opdracht van <Link className={styles['link']} to={'https://www.novi.nl/'}  target="_blank">NOVI Hogeschool</Link> © 2023
            </span>
            {children}
        </footer>

    );
}

export default Footer;