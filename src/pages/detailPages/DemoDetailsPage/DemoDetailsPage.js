import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import Header from '../../../components/otherComponents/structuralComponents/Header/Header';
import DemoDetails from "../../../components/detailComponents/DemoDetails/DemoDetails";
import styles from './DemoDetailsPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {GetRequest} from "../../../helpers/axiosHelper";
import {AuthContext} from "../../../context/AuthContext";
import MainComponent from "../../../components/otherComponents/structuralComponents/MainComponent/MainComponent";

function DemoDetailsPage({mode}) { // modes: 'anon', 'personal', 'owner' or 'admin'
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
                        {(mode === 'anon' || mode === 'personal' || mode === 'owner') && <h3>Demo specifications</h3>}
                        {mode === 'admin' && <h3>Demo specifications (admin mode)</h3>}
                        <h4>{` ...for demo "${demo.title}" by ${demo.producer.username}`}</h4>
                    </Header>
                    <MainComponent>
                        {demo ? <DemoDetails demo={demo} mode={mode}/> : <p>Loading...</p>}
                    </MainComponent>
                    <Footer/>
                </>
            }
        </>
    );
}

export default DemoDetailsPage;