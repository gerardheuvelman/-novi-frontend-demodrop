import React from 'react';
import styles from './CommonPageComponent.module.scss';

function CommonPageComponent({children}) {
    return (
        <div className='container'>
            {children}
        </div>
    );
}

export default CommonPageComponent;