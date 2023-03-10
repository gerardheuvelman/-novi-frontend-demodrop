import React from 'react';
// import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import styles from './ModalConfirmWindow.module.css';

const ModalConfirmWindow = ({formData, onCancel, onConfirm,  children}) => {

    const handleCancel = () => {
        onCancel();
    };

    const handleConfirm = () => {
        onConfirm();
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
        <span className={styles.close} onClick={handleCancel}>
          &times;
        </span>
                <p>
                    {formData.toString()}
                </p>
                <p>{children}</p>
                <button className={styles.cancelButton} onClick={handleCancel}>
                    Cancel
                </button>
                <button className={styles.confirmButton} onClick={handleConfirm}>
                    Confirm
                </button>
            </div>
        </div>
    );
};

export default ModalConfirmWindow;
