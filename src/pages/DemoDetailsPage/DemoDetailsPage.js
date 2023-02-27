import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Header from '../../components/Header/Header';
import DemoDetails from "../../components/DemoDetails/DemoDetails";
import styles from './DemoDetailsPage.module.css';
import Footer from "../../components/Footer/Footer";
import {GetRequest} from "../../helpers/axiosHelper";

function DemoDetailsPage({mode}) { // mode: 'anon' 'user', 'personal' or 'admin'
    const {demoId} = useParams();
    const [demo, setDemo] = useState(null);

    useEffect(() => {
        const controller = new AbortController;

        async function fetchDemo() {
            const response = await new GetRequest(`/demos/${demoId}`).invoke();
            setDemo(response.data);
        }
        void fetchDemo();
    }, []);

    return (
        <>
            {demo &&
                <>
                    <Header>
                        {mode === 'user' && <h1>Demo specifications</h1>}
                        {mode === 'admin' && <h1>Demo specifications (admin mode)</h1>}
                        <h4>{` ...for demo "${demo.title}"`}</h4>
                    </Header>
                    <main>
                        {demo ? <DemoDetails demo={demo} mode={mode}/> : <p>Loading...</p>}
                    </main>
                    <Footer/>
                </>
            }
        </>
    );
}

export default DemoDetailsPage;