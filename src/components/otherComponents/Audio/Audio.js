import React from 'react';
import styles from './Audio.module.css';


function Audio({source} ) {
    return (
        <audio controls className={styles['audio']}>
            <source id={source} type="audio/mpeg"/>
            Your browser does not support the audio element.
        </audio>
    );
}

export default Audio;