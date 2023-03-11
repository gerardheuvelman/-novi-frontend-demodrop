import React, {useContext, useState} from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import {Link, redirect} from "react-router-dom";
import {AuthContext} from '../../../context/AuthContext';
import styles from './DemoControlPanel.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import DemoList from "../../../components/listComponents/DemoList/DemoList";

function DemoControlPanel({mode}) { // mode: 'admin'

    const {user} = useContext(AuthContext);
    console.log('User object:', user);

    return (
        <>
            <Header>
                <h1>Demo control panel</h1>
                <h2>Welcome, {user.username} </h2>
            </Header>
            <main>
                <section>
                    <p><Link to={'/admin/demos/create'}>Create new demo</Link></p>
                </section>
                <DemoList mode={mode} limit={0} ></DemoList>
            </main>
            <Footer/>
        </>

    );
}

export default DemoControlPanel;