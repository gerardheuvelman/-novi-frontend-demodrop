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

function AudioFileControlPanel({mode}) { // mode: 'admin'
    const [purgeResponse, setPurgeResponse] = useState("Sorry, no response yet...");
    const {user} = useContext(AuthContext);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    console.log('AudioFileControlPanel user:', user);
    console.log('AudioFileControlPanel purgeResponse:', purgeResponse);

    // async function purgeOrphanedMpsFiles() {
    //     console.log('Now deleting orphaned mp3 files...');
    //     const response = await new DeleteRequest('/audiofiles/purge');
    //     setPurgeResponse(response.data);
    // }
    //
    // function showConfirmModal() {
    //     setShowConfirm(true)
    // }
    //
    // function handleClose() {
    //     setShowMessage(false);
    // }
    //
    // const handeCancel = ()=> {
    //     setShowConfirm(false);
    // }
    //
    // const handeConfirm = handlePurgeConfirm();
    //
    // async function handlePurgeConfirm() {
    //     setShowConfirm(false);
    //     await purgeOrphanedMpsFiles();
    //     setShowMessage(true);
    // }

    return (
        <>
            <Header>
                <h1>Audio file control panel</h1>
                <h2>Welcome, {user.username} </h2>
            </Header>
            <main>
                <section>
                    <p><Link to={'/admin/audiofiles/create'}>Create new audio file (Not on disk)</Link></p>
                    {/*<button type='button' onClick={showConfirmModal}>Purge orphaned mp3 files</button>*/}
                    {/*{showConfirm &&*/}
                    {/*    <ModalConfirmWindow onCancel={handeCancel} onConfirm={handeConfirm}>*/}
                    {/*        You are about to delete all mp3 files from disk that have no corresponding "audioFile"*/}
                    {/*        record. Are you sure?*/}
                    {/*    </ModalConfirmWindow>}*/}
                    {/*{setShowMessage && <ModalMessageWindow onClose={handleClose}>*/}
                    {/*    {purgeResponse}*/}
                    {/*</ModalMessageWindow>}*/}
                </section>
                <AudioFileList mode={mode} limit={0}></AudioFileList>
            </main>
            <Footer/>
        </>

    );
}

export default AudioFileControlPanel;