import React from 'react';
// import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";
import styles from './ModalConfirmWindow.module.css';
import Button from "../../buttons/Button/Button";

const ModalConfirmWindow = ({onCancel, onConfirm, children}) => {

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
                <p className={styles.modalChildren}>{children}</p>
                <Button color='red' className={styles.cancelButton} onClick={handleCancel}>
                    Cancel
                </Button>
                <Button color='red' className={styles.confirmButton} onClick={handleConfirm}>
                    Confirm
                </Button>
            </div>
        </div>
    );
};

export default ModalConfirmWindow;
