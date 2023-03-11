import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from './ModalMessageWindow.module.css';

const ModalMessageWindow = ({ onClose, children }) => {

    const handleClose = () => {
        onClose();
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
