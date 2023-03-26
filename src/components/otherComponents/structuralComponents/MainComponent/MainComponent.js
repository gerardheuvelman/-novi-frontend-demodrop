import React from 'react';
import styles from './MainComponent.module.css';
import {Link} from "react-router-dom";

function MainComponent({children}) {
    return (
        <main className='outer-content-container'>
            <div className='inner-content-container'>
                {children}
                <section><Link className='back-button-link' onClick={() => window.history.back()} to="#">{` <<Back`}</Link></section>
            </div>
        </main>
    );
}

export default MainComponent;