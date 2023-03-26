import React, {useEffect, useState} from 'react';
import Header from '../../../components/otherComponents/structuralComponents/Header/Header';
import DemoForm from "../../../components/formComponents/DemoForm/DemoForm";
import styles from './DemoFormPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {Link, useParams} from "react-router-dom";
import {GetRequest} from "../../../helpers/axiosHelper";
import MainComponent from "../../../components/otherComponents/structuralComponents/MainComponent/MainComponent";

function DemoFormPage({mode, type}) { // modes : 'admin' or others; types: 'create' or 'update'
    const {demoId} = useParams();
    const [demo, setDemo] = useState(null);

    console.log('mode in DemoFormPage: ', mode);
    console.log('type in DemoFormPage: ', type);

    useEffect(() => {
        async function fetchDemo() {
            console.log('fetchDemo invoked!');
            const response = await new GetRequest(`/demos/${demoId}`).invoke();
            setDemo(response.data);
        }
        if (type === 'update') {
            void fetchDemo();
        }
    }, [type]);

    useEffect(() => {
        function setBlankDemo() {
            console.log('setBlankDemo invoked!')
            const blankDemo = {
                title: null,
                length: null,
                bpm: null,
                genre: {name: 'Unknown'},
                file: null
            };
            setDemo(blankDemo);
        }
        if (type === 'create') {
            setBlankDemo();
        }
    }, [type]);

    return (
        <>
            {demo &&
                <>
                    <Header>
                        {type === 'create' &&
                            <>
                                <h3>Upload new demo</h3>
                                <h4>Create a new demo</h4>
                            </>}
                        {type === 'update' &&
                            <>
                                <h3>Change demo details</h3>
                                <h4>{`Edit form for demo "${demo.title}"`}</h4>
                            </>}
                    </Header>
                    <MainComponent>
                        <DemoForm mode={mode} type={type} prefillDemo={demo}/>
                    </MainComponent>
                    <Footer/>
                </>
            }

        </>
    );
}

export default DemoFormPage;