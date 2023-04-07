import React, {useContext, useState} from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import {Link, redirect} from "react-router-dom";
import {AuthContext} from '../../../context/AuthContext';
import styles from './AudioFileControlPanel.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import DemoList from "../../../components/listComponents/DemoList/DemoList";
import AudioFileList from "../../../components/listComponents/AudioFileList/AudioFileList";
import {DeleteRequest} from "../../../helpers/axiosHelper";
import ModalConfirmWindow from "../../../components/otherComponents/Modals/ModalConfirmWindow/ModalConfirmWindow";
import ModalMessageWindow from "../../../components/otherComponents/Modals/ModalMessageWindow/ModalMessageWindow";
import MainComponent from "../../../components/otherComponents/structuralComponents/MainComponent/MainComponent";
import Button from "../../../components/otherComponents/buttons/Button/Button";
import DeleteButton from "../../../components/otherComponents/buttons/DeleteButton/DeleteButton";

function AudioFileControlPanel({mode}) { // mode: 'admin'
    const [purgeResponse, setPurgeResponse] = useState("Sorry, no response yet...");
    const {user} = useContext(AuthContext);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showMessage, setShowMessage] = useState(false);


    console.log('AudioFileControlPanel user:', user);
    console.log('AudioFileControlPanel purgeResponse:', purgeResponse);

    async function purgeOrphanedMpsFiles() {
        console.log('Now deleting orphaned mp3 files...');
        const response = await new DeleteRequest('/audiofiles/purge').invoke();
        setPurgeResponse(response.data);
    }

    function showConfirmModal() {
        setShowConfirm(true)
    }

    function handleClose() {
        setShowMessage(false);
    }

    const handeCancel = () => {
        setShowConfirm(false);
    }

    async function handlePurgeConfirm() {
        setShowConfirm(false);
        await purgeOrphanedMpsFiles();
        setShowMessage(true);
    }

    return (
        <>
            <Header>
                <h3>Audio file control panel</h3>
                <h4>Welcome, {user.username} </h4>
            </Header>
            <MainComponent>
                <section className='panel-controls'>
                    <h3>Available actions</h3>
                    <Link to={'/admin/audiofiles/create'}>Create new audio file (Not on disk)</Link>
                    <Button color='white' type='button' onClick={showConfirmModal}>Purge orphaned mp3 files</Button>
                    {/*<DeleteButton color='white' entityName='AudioFile' mode={mode} type='all'>Delete orphaned audio files</DeleteButton>*/}
                </section>
                <AudioFileList mode={mode} limit={0}></AudioFileList>
            </MainComponent>
            <Footer/>

            {showConfirm &&
                <ModalConfirmWindow onCancel={handeCancel} onConfirm={handlePurgeConfirm}>
                    {`You are about to permanently delete all  mp3 files files on disk that do not have an associated audio file entity. `}
                    Are you sure?
                </ModalConfirmWindow>
            }
            {(showMessage && mode === 'admin') &&
                <ModalMessageWindow onClose={handleClose}>
                    {`${purgeResponse}\nPress the button to return to the audio file control panel`}
                </ModalMessageWindow>
            }
        </>

    );
}

export default AudioFileControlPanel;