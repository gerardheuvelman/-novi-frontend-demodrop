import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from './ModalMessageWindow.module.css';
import Button from "../../buttons/Button/Button";

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
                <p className={styles.modalChildren}>{children}</p>
                <Button color='red' className={styles.closeButton} onClick={handleClose}>
                    Close
                </Button>
            </div>
        </div>
    );
};

export default ModalMessageWindow;
