import React from 'react';
import styles from './HomePageMainComponent.module.scss';

function HomePageMainComponent({children}) {
    return (
        <main className='outer-content-container'>
            <div className='inner-content-container'>
                {children}
            </div>
        </main>
    );
}

export default HomePageMainComponent;