import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import styles from './AudioFileFormPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import UserForm from "../../../components/formComponents/UserForm/UserForm";
import {GetRequest} from "../../../helpers/axiosHelper";
import AudioFileForm from "../../../components/formComponents/AudioFileForm/AudioFileForm";

function AudioFileFormPage({mode, type}) { // modes : 'admin; types: 'create', or 'update'
    const {audioFileId} = useParams();
    const [audioFile, setAudioFile] = useState(null);

    useEffect(() => {
        async function fetchAudioFile() {
            const response = await new GetRequest(`/audiofiles/${audioFileId}`).invoke();
            setAudioFile(response.data);
        }
        if (type === 'update')
        void fetchAudioFile();
    }, []);

    useEffect(() => {
        function setAudioFileToBlankAudioFile() {
            const blankAudioFile = {
                audioFileId: null,
                createdDate: null,
                originalFileName: null,
                demo: null
            };
            setAudioFile(blankAudioFile);
        }
        if (type === 'create')
            void setAudioFileToBlankAudioFile();
    }, []);

    return (
    <>
        <Header>
            {type === 'create' &&
                <>
                    {mode  === 'admin' && <h1>Create a new audio file</h1>}
                    {mode  === 'admin' && <h2>no mp3 file will be attached</h2>}
                </>}
            {type === 'update' &&
                <>
                    <h1>Edit AudioFile details</h1>
                    <h2>{`Edit form for audio file "${audioFileId}"`}</h2>
                </>}
        </Header>
        <main>
            {audioFile && <AudioFileForm mode={mode} type={type} prefillAudioFile={audioFile} />}
            <p><Link onClick={() => window.history.back()} to="#">{` <<Back`}</Link></p>
        </main>
        <Footer/>
    </>
  );
}

export default AudioFileFormPage;