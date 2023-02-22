import React from 'react';
import styles from './SetStartedSection.module.css';
import {useNavigate} from "react-router-dom";

function GetStartedSection({children}) {
    const navigate = useNavigate();

    return (
        <section className="outer-container">
            <div className='inner-container'>
                <button
                    type='button'
                    onClick={() => navigate('/demos/drop')}
                >
                    Drop your demo
                </button>
                <span>Get started today!</span>
                <button
                    type='button'
                    onClick={() => navigate('/demos')}
                >
                    Search demos
                </button>
                {children}
            </div>
        </section>
    );
}

export default GetStartedSection;