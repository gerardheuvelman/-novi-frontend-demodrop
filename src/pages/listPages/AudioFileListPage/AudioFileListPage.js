import React, {useContext} from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import {AuthContext} from "../../../context/AuthContext";
import styles from './AudioFileListPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import AudioFileList from "../../../components/listComponents/AudioFileList/AudioFileList";
import {Link} from "react-router-dom";
import MainComponent from "../../../components/otherComponents/structuralComponents/MainComponent/MainComponent";

function AudioFileListPage({mode}) { // Values for "mode":  'admin'
    const {user} = useContext(AuthContext);

    return (
        <>
            <Header>
                {mode === 'admin' && <h3>Audio files (admin mode)</h3>}
                {mode === 'admin' && <h4>Full CRUD access to audio files</h4>}
            </Header>
            <MainComponent>
                <div className="page-container">
                    <AudioFileList mode={mode} limit={0}></AudioFileList>
                </div>
            </MainComponent>
            <Footer/>
        </>
    );
}

export default AudioFileListPage;