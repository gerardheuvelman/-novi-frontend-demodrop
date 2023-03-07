import React, {useContext} from 'react';
import Header from "../../components/Header/Header";
import {AuthContext} from "../../context/AuthContext";
import styles from './AudioFileListPage.module.css';
import Footer from "../../components/Footer/Footer";
import AudioFileList from "../../components/AudioFileList/AudioFileList";

function AudioFileListPage({mode, limit}) { // Values for "mode":  'admin'
    const {user} = useContext(AuthContext);

    return (
        <>
            <Header>
                {mode === 'admin' && <h1>Audio File list (admin mode)</h1>}
                {mode === 'admin' && <h4>Full CRUD access to audio files</h4>}
            </Header>
            <main>
                <div className="page-container">
                    <AudioFileList mode={mode} limit={limit}></AudioFileList>
                </div>
            </main>
            <Footer/>
        </>
    );
}

export default AudioFileListPage;