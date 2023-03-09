import React, {useEffect, useState} from 'react';
import Header from '../../../components/otherComponents/structuralComponents/Header/Header';
import {Link, useParams} from "react-router-dom";
import DemoForm from "../../../components/formComponents/DemoForm/DemoForm";
import styles from './DemoEditPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {GetRequest} from "../../../helpers/axiosHelper";

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
                        <h1>Change demo details</h1>
                        {console.log('title: ', demo.title)}
                        <h4>{`Edit form for demo "${demo.title}"`}</h4>
                    </Header>
                    <main>
                        <DemoForm mode='update' prefillDemo={demo}/>
                        <p><Link onClick={() => window.history.back()} to="#">{` <<Back`}</Link></p>
                    </main>
                    <Footer/>
                </>
            }
        </>
    );
}

export default DemoEditPage;