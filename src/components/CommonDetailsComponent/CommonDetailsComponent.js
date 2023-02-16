import React from 'react';
import styles from './CommonDetailsComponent.module.scss';

function CommonDetailsComponent({children}) {
    return (
        <div className='details-container' >
            {children}
        </div>
    );
}

export default CommonDetailsComponent;