import React, {useEffect, useState} from 'react';
import Header from '../../components/Header/Header';
import {useParams} from "react-router-dom";
import DemoForm from "../../components/DemoForm/DemoForm";
import styles from './DemoEditPage.module.css';
import Footer from "../../components/Footer/Footer";
import {GetRequest} from "../../helpers/axiosHelper";

function DemoEditPage() {
    const {demoId} = useParams();
    const [demo, setDemo] = useState(null);

    useEffect(() => {
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
                        <h1>Demo upload page</h1>
                        {console.log('title: ', demo.title)}
                        <h4>{`Edit demo "${demo.title}"`}</h4>
                    </Header>
                    <main>
                        <DemoForm mode='update' prefillDemo={demo}/>
                    </main>
                    <Footer/>
                </>
            }
        </>
    );
}

export default DemoEditPage;