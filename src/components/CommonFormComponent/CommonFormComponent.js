import React from 'react';
import styles from './CommonFormComponent.module.css';

function CommonFormComponent({children}) {
    return (
        <div>
            {children}
        </div>
    );
}

export default CommonFormComponent;