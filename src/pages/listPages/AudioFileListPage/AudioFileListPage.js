import React, {useContext} from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import {AuthContext} from "../../../context/AuthContext";
import styles from './AudioFileListPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import AudioFileList from "../../../components/listComponents/AudioFileList/AudioFileList";
import {Link} from "react-router-dom";

function AudioFileListPage({mode}) { // Values for "mode":  'admin'
    const {user} = useContext(AuthContext);

    return (
        <>
            <Header>
                {mode === 'admin' && <h1>Audio files (admin mode)</h1>}
                {mode === 'admin' && <h4>Full CRUD access to audio files</h4>}
            </Header>
            <main>
                <div className="page-container">
                    <AudioFileList mode={mode} limit={0}></AudioFileList>
                </div>
                <p><Link onClick={() => window.history.back()} to="#">{` <<Back`}</Link></p>
            </main>
            <Footer/>
        </>
    );
}

export default AudioFileListPage;