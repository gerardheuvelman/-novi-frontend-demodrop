import React, { useEffect, useState} from 'react';
import './DemoEditPage.css';
import axios from 'axios';
import Header from '../../components/Header/Header';
import {useParams} from "react-router-dom";
import DemoForm from "../../components/DemoForm/DemoForm";
import styles from './DemoEditPage.module.scss';

function DemoEditPage() {
    const { demoId } = useParams();
    const [demo, setDemo] = useState(null);

    useEffect(() => { // TODO: Moderniseren
        async function fetchDemo() {
            try {
                const response = await axios.get(`http://localhost:8080/demos/${demoId}`);
                console.log(`http://localhost:8080/demos/${demoId} yields the following response: `,response);
                setDemo(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        void fetchDemo();
    }, []);

    return (
        <>
            <Header>
                <h1>Demo upload page</h1>
                <h4>{`Edit demo "${demo.title}"`}</h4>
            </Header>
            <main>
                <DemoForm mode='update' prefillDemo={demo}/>
            </main>
        </>
    );
}
export default DemoEditPage;