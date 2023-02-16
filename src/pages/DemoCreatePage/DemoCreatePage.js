import React, { useEffect, useState} from 'react';
import Header from '../../components/Header/Header';
import DemoForm from "../../components/DemoForm/DemoForm";
import styles from './DemoCreatePage.module.scss';
import Footer from "../../components/Footer/Footer";

function DemoCreatePage() {

    const blankDemo = {
        title: "",
        length: 0,
        bpm: 0,
        genre: {name: 'unknown'},
        file: null
    };

    return (
        <>
            <Header>
                <h1>Demo upload form</h1>
                <h4>Create a new demo</h4>
            </Header>
            <main>

                <DemoForm mode='create' prefillDemo={blankDemo}/>
            </main>
            <Footer/>
        </>
    );
}
export default DemoCreatePage;