import React, {useEffect, useState} from 'react';
import styles from './DemoTilesSection.module.scss';
import DemoTile from "../DemoTile/DemoTile";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function DemoTilesSection({children}) {

    const [demos, setDemos] = useState([]);

    useNavigate();
//TODO: moderniseren
    useEffect(() => {
        async function fetchShortDemoList() {
            try {
                const response = await axios.get('http://localhost:8080/demos/?limit=12');
                console.log(response.data);
                setDemos(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchShortDemoList();
    }, [])

    return (
        <section className= 'outer-container'>
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