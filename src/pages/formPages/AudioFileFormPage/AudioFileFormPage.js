import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import styles from './AudioFileFormPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import UserForm from "../../../components/formComponents/UserForm/UserForm";
import {GetRequest} from "../../../helpers/axiosHelper";
import AudioFileForm from "../../../components/formComponents/AudioFileForm/AudioFileForm";
import MainComponent from "../../../components/otherComponents/structuralComponents/MainComponent/MainComponent";

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
        {audioFile &&
            <>
            <Header>
                {type === 'create' &&
                    <>
                        {mode  === 'admin' && <h3>Create a new audio file</h3>}
                        {mode  === 'admin' && <h4>no mp3 file will be attached</h4>}
                    </>}
                {type === 'update' &&
                    <>
                        <h3>Edit AudioFile details</h3>
                        <h4>{`Edit form for audio file "${audioFileId}"`}</h4>
                    </>}
            </Header>
            <MainComponent>
                {audioFile && <AudioFileForm mode={mode} type={type} prefillAudioFile={audioFile} />}
            </MainComponent>
            <Footer/>
        </>}
    </>
  );
}

export default AudioFileFormPage;