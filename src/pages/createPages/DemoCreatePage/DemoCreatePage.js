import React, { useEffect, useState} from 'react';
import Header from '../../../components/otherComponents/structuralComponents/Header/Header';
import DemoForm from "../../../components/formComponents/DemoForm/DemoForm";
import styles from './DemoCreatePage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {Link} from "react-router-dom";

function DemoCreatePage() {

    const blankDemo = {
        title: null,
        length: null,
        bpm: null,
        genre: {name: 'Unknown'},
        file: null
    };

    return (
        <>
            <Header>
                <h1>Upload new demo</h1>
                <h4>Create a new demo</h4>
            </Header>
            <main>
                <DemoForm mode='create' prefillDemo={blankDemo}/>
                <p><Link onClick={() => window.history.back()} to="#">{` <<Back`}</Link></p>
            </main>
            <Footer/>
        </>
    );
}
export default DemoCreatePage;