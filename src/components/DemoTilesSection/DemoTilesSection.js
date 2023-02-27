import React, {useEffect, useState} from 'react';
import styles from './DemoTilesSection.module.css';
import DemoTile from "../DemoTile/DemoTile";
import axios from "axios";
import {GetRequest} from "../../helpers/axiosHelper";

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
        <section className='outer-container'>
            <div className='inner-container'>
                <h2>Listen to our latest demos</h2>
                <div>
                    {demos.map((demo) => {
                        return <DemoTile demo={demo} key={demo.demoId}/>
                    })}
                </div>
                {children}
            </div>
        </section>
    );
}

export default DemoTilesSection;