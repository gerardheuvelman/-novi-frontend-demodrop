import React from 'react';
import styles from './Button.module.css';

function Button({type, color, onClick, children}) { //color: 'white', 'red' or 'black'
    switch (color) {
        case 'white':
            return (
                <button type={type} onClick={onClick} className={styles['white-button']}>
                    {children}
                </button>
            );
            break;
        case 'black':
            return (
                <button type={type} onClick={onClick} className={styles['black-button']}>
                    {children}
                </button>
            );
            break;
        case 'red':
            return (
                <button type={type} onClick={onClick} className={styles['red-button']}>
                    {children}
                </button>
            );
            break;

    }

}

export default Button;