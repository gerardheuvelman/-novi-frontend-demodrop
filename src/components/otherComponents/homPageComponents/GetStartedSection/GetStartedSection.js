import React, {useContext} from 'react';
import styles from './SetStartedSection.module.css';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../../../context/AuthContext";

function GetStartedSection({children}) {
    const navigate = useNavigate();
    const {isAuth, user} = useContext(AuthContext);

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
                    onClick={() => {
                        isAuth? navigate('/demos') : navigate('/demos4all');
                    }}
                >
                    Search demos
                </button>
                {children}
            </div>
        </section>
    );
}

export default GetStartedSection;