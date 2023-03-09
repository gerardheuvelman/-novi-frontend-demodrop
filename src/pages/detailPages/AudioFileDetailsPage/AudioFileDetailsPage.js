import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import Header from '../../../components/otherComponents/structuralComponents/Header/Header';
import styles from './AudioFileDetailsPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {GetRequest} from "../../../helpers/axiosHelper";
import AudioFileDetails from "../../../components/detailComponents/AudioFileDetails/AudioFileDetails";

function AudioFileDetailsPage({mode}) { // mode: 'admin'
    const {audioFileId} = useParams();
    const [audioFile, setAudioFile] = useState(null);

    useEffect(() => {
        async function fetchAudioFile() {
            const response = await new GetRequest(`/audiofiles/${audioFileId}`).invoke();
            setAudioFile(response.data);
        }
        void fetchAudioFile();
    }, []);

    return (
        <>
            {audioFile &&
                <>
                    <Header>
                        {mode === 'admin' && <h1>Audio file specifications (admin mode)</h1>}
                        <h4>{` ...for audio file "${audioFile.audioFileId}"`}</h4>
                    </Header>
                    <main>
                        {audioFile ? <AudioFileDetails audioFile={audioFile} mode={mode}/> : <p>Loading...</p>}
                        <p><Link onClick={() => window.history.back()} to="#">{` <<Back`}</Link></p>
                    </main>
                    <Footer/>
                </>
            }
        </>
    );
}

export default AudioFileDetailsPage;