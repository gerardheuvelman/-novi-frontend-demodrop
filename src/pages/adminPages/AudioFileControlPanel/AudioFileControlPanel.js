import React, {useContext, useState} from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import {Link, redirect} from "react-router-dom";
import {AuthContext} from '../../../context/AuthContext';
import styles from './AudioFileControlPanel.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import DemoList from "../../../components/listComponents/DemoList/DemoList";
import AudioFileList from "../../../components/listComponents/AudioFileList/AudioFileList";

function AudioFileControlPanel({mode}) { // mode: 'admin'

    const {user} = useContext(AuthContext);
    console.log('User object:', user);

    return (
        <>
            <Header>
                <h1>Audio file control panel</h1>
                <h2>Welcome, {user.username} </h2>
            </Header>
            <main>
                <section>
                    <p><Link to={'/admin/audiofiles/createaudiofile'}>Create new audio file (Not on disk)</Link></p>
                </section>
                <AudioFileList mode={mode} limit={0} ></AudioFileList>
            </main>
            <Footer/>
        </>

    );
}

export default AudioFileControlPanel;