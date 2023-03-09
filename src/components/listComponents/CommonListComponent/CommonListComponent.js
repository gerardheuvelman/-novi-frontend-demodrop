import React from 'react';
import styles from './CommonListComponent.module.css';

function CommonListComponent({children}) {
    return (
        <div>
            {children}
        </div>
    );
}

export default CommonListComponent;