import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';
import DemoDetails from "../../components/DemoDetails/DemoDetails";
import styles from './DemoDetailsPage.module.scss';
import Footer from "../../components/Footer/Footer";

function DemoDetailsPage() {
    const {demoId} = useParams();
    const [demo, setDemo] = useState(null);
    useEffect(() => { // TODO moderniseren!!
        async function fetchDemo() {
            try {
                const response = await axios.get(`http://localhost:8080/demos/${demoId}`);
                console.log('`http://localhost:8080/demos/${demoId}` yields the following result: ', response);
                setDemo(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchDemo();
    }, []);

    return (
        <>
            {demo &&
                <>
                    <Header>
                        <h1>"{demo.title}"</h1>
                        <h4>Demo specifications</h4>
                    </Header>
                    <main>
                        demo ? <DemoDetails demo={demo}/> : <p>Loading...</p>
                    </main>
                    <Footer/>
                </>
            }
        </>
    );
}

export default DemoDetailsPage;