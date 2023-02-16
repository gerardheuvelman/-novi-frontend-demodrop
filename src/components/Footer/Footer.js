import React from 'react';

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