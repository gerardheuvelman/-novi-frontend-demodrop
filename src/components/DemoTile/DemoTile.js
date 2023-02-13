import React from 'react';
import {Link} from "react-router-dom";
import styles from './DemoTile.module.scss';

function DemoTile({demo}) {
    return (
        <article>
            <p>{demo.user.username}</p>
            <h3>{demo.title}</h3>
            <p><Link to={`/demos/${demo.demoId}`}>PLAY</Link></p>
        </article>
    );
}

export default DemoTile;