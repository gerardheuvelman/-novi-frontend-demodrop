import React from 'react';
import styles from './CommonFormComponent.module.scss';

function CommonFormComponent({children}) {
    return (
        <div>
            {children}
        </div>
    );
}

export default CommonFormComponent;