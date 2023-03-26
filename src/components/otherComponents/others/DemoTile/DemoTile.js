import React from 'react';
import {Link} from "react-router-dom";
import styles from './DemoTile.module.css';

function DemoTile({demo}) {
    return (
        <article  className={styles['demo-tile']}>
            <p className={styles['demo-tile-username']}> {demo.user.username}</p>
            <h4>{demo.title}</h4>
            <p><Link className={styles['demo-tile-link']} to={`/demos/${demo.demoId}`}>PLAY</Link></p>
        </article>
    );
}

export default DemoTile;