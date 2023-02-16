import React from 'react';
import styles from './CommonListComponent.module.scss';

function CommonListComponent({children}) {
    return (
        <div>
            {children}
        </div>
    );
}

export default CommonListComponent;