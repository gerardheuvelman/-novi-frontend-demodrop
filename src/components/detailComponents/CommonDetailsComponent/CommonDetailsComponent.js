import React from 'react';
import styles from './CommonDetailsComponent.module.css';

function CommonDetailsComponent({children}) {
    return (
        <div className='details-container' >
            {children}
        </div>
    );
}

export default CommonDetailsComponent;