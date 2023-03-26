import React, {useContext, useState} from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import {Link, redirect} from "react-router-dom";
import {AuthContext} from '../../../context/AuthContext';
import styles from './DemoControlPanel.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import DemoList from "../../../components/listComponents/DemoList/DemoList";
import MainComponent from "../../../components/otherComponents/structuralComponents/MainComponent/MainComponent";

function DemoControlPanel({mode}) { // mode: 'admin'

    const {user} = useContext(AuthContext);
    console.log('User object:', user);

    return (
        <>
            <Header>
                <h3>Demo control panel</h3>
                <h4>Welcome, {user.username} </h4>
            </Header>
            <MainComponent>
                <section className='panel-controls'>
                    <h3>Available actions</h3>
                    <Link to={'/admin/demos/create'}>Create new demo</Link>
                </section>
                <DemoList mode={mode} limit={0} ></DemoList>
            </MainComponent>
            <Footer/>
        </>

    );
}

export default DemoControlPanel;