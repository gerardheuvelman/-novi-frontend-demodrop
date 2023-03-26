import React, {useEffect, useState} from 'react';
import styles from './DemoTilesSection.module.css';
import DemoTile from "../../others/DemoTile/DemoTile";
import axios from "axios";
import {GetRequest} from "../../../../helpers/axiosHelper";

function DemoTilesSection({children}) {
    const [demos, setDemos] = useState([]);
    useEffect(() => {
        async function fetchShortDemoList() {
            const response = await new GetRequest('/demos/?limit=12').invoke();
            setDemos(response.data);
        }

        void fetchShortDemoList();
    }, [])

    return (
        <section className={styles['demo-tiles-section']}>
            <h3 className={styles['demo-tiles-header']}>Our latest demos</h3>
            <div className={styles['demo-tiles-container']}>
                {demos.map((demo) => {
                    return <DemoTile demo={demo} key={demo.demoId}/>
                })}
            </div>
            {children}
        </section>
    );
}

export default DemoTilesSection;