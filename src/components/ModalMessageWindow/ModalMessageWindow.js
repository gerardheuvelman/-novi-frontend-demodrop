import React from 'react';
// import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import styles from './ModalMessageWindow.module.css';

const ModalMessageWindow = ({ children, redirectRoute }) => {
    let navigate = useNavigate();

    const handleClose = () => {
        navigate(redirectRoute);
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
        <span className={styles.close} onClick={handleClose}>
          &times;
        </span>
                <p>{children}</p>
                <button className={styles.closeButton} onClick={handleClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default ModalMessageWindow;
