import React, {useContext} from 'react';
import styles from './SetStartedSection.module.css';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../../../context/AuthContext";
import Button from "../../buttons/Button/Button";

function GetStartedSection({children}) {
    const navigate = useNavigate();
    const {isAuth, user} = useContext(AuthContext);

    return (
        <section className={styles['get-started-section']}>
            <div className={styles['section-background']}>
                <h3 className={styles['get-started-header']}>Get started</h3>
                <div className={styles['buttons-container']}>
                    <Button
                        color='red'
                        className={styles['get-started-button']}
                        type='button'
                        onClick={() => navigate('/demos/drop')}
                    >
                        Drop your demo
                    </Button>
                    <span className={styles['get-started-text']}>Get started today!</span>
                    <Button
                        color='red'
                        className={styles['get-started-button']}
                        type='button'
                        onClick={() => {
                            isAuth? navigate('/demos') : navigate('/demos');
                        }}
                    >
                        Search demos
                    </Button>
                </div>

            </div>
        </section>
    );
}

export default GetStartedSection;