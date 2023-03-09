import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import Header from '../../../components/otherComponents/structuralComponents/Header/Header';
import DemoDetails from "../../../components/detailComponents/DemoDetails/DemoDetails";
import styles from './DemoDetailsPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {GetRequest} from "../../../helpers/axiosHelper";
import {AuthContext} from "../../../context/AuthContext";

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
                        {(mode === 'anon' || mode === 'personal' || mode === 'owner') && <h1>Demo specifications</h1>}
                        {mode === 'admin' && <h1>Demo specifications (admin mode)</h1>}
                        <h4>{` ...for demo "${demo.title}" by ${demo.user.username}`}</h4>
                    </Header>
                    <main>
                        {demo ? <DemoDetails demo={demo} mode={mode}/> : <p>Loading...</p>}
                        <p><Link onClick={() => window.history.back()} to="#">{` <<Back`}</Link></p>
                    </main>
                    <Footer/>
                </>
            }
        </>
    );
}

export default DemoDetailsPage;