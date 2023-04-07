import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {AuthContext} from '../../../context/AuthContext';
import styles from './DemoDetails.module.css';
import FavButton from "../../otherComponents/buttons/FavButton/FavButton";
import axios from "axios";
import DeleteButton from "../../otherComponents/buttons/DeleteButton/DeleteButton";
import {DateTime} from "../../../helpers/dateTimeHelper";
import Button from "../../otherComponents/buttons/Button/Button";
import Audio from "../../otherComponents/Audio/Audio";

function DemoDetails({demo, mode}) { // mode: 'anon', 'personal', 'owner' or 'admin'
    const {user} = useContext(AuthContext);
    const dateTimeCreated = new DateTime(demo.createdDate);
    const createdDate = dateTimeCreated.getDateString();
    const createdTime = dateTimeCreated.getTimeString();

    const scheme = process.env.REACT_APP_SERVER_SCHEME;
    const domain = process.env.REACT_APP_SERVER_DOMAIN;
    const port = process.env.REACT_APP_SERVER_PORT;
    const url = `/demos/${demo.demoId}/download`;
    const fullUrl = scheme + '://' + domain + ':' + port + url;

    console.log('DemoDetails mode: ', mode);

    useEffect(() => {
        async function fetchAudioFile() {
            fetch(fullUrl)
                .then(response => response.arrayBuffer())
                .then(buffer => {
                    const audioElement = document.querySelector('audio');
                    const sourceElement = document.querySelector('#mp3Source');
                    const blob = new Blob([buffer], {type: 'audio/mpeg'});
                    const url = URL.createObjectURL(blob);
                    sourceElement.setAttribute('src', url);
                    audioElement.load();
                })
                .catch(error => console.log(error));
        }

        void fetchAudioFile();
    }, []);

    function downloadDemo() {
        fetch(fullUrl)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = demo.audioFile.originalFileName;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => console.log(error));
    }

    return (
        <>
            {demo &&
                <section className='details-section'>
                    <article className='details-info'>
                        <h4>Created</h4>
                        <span>
                            {createdDate}  {createdTime}
                        </span>
                        <h4>Title</h4>
                        {demo.title}
                        <h4>producer</h4>
                        {mode !== 'owner' &&
                            <Link to={`/users/${demo.producer.username}/profile`}>{demo.producer.username}</Link>}
                        {mode === 'owner' && <span>{demo.producer.username}</span>}
                        <h4>Length</h4>
                        {demo.length}
                        <h4>BPM</h4>
                        {demo.bpm}
                        <h4>Genre</h4>
                        {demo.genre.name}
                        <h4>audio file ID</h4>
                        {demo.audioFile.audioFileId}
                        <h4>Filename</h4>
                        {demo.audioFile.originalFileName}>
                    </article>
                    <article className='details-controls'>
                        <h3>Available actions</h3>
                        <Audio source={"mp3Source"} />
                        {user &&
                            <span><strong>Favorite list:</strong><FavButton color='white' demoId={demo.demoId}></FavButton></span>}
                        {/*Only show this link if You arre logged in and the demo it is YOUR demo*/}
                        {(user && (user.username === demo.producer.username)) &&
                            <Link to={`/demos/${demo.demoId}/edit`}>Edit this demo</Link>}
                        {/*only show this link if you are logged in and it is NOT your demo*/}
                        {(user && (user.username !== demo.producer.username)) &&
                            <Link to={`/demos/${demo.demoId}/inquire`}>Inquire about this demo</Link>}
                        <Button color='white' id="downloadBtn" type='button' onClick={downloadDemo}>Download mp3
                            file</Button>
                        {(mode === 'admin') &&
                            <Link to={`/admin/demos/${demo.demoId}/edit`}>Edit this demo</Link>}
                        {(mode === 'owner' || mode === 'admin') &&
                            <DeleteButton
                                color='white'
                                entityName='demo'
                                entityId={demo.demoId}
                                friendlyId={demo.title}
                                mode={mode}
                                type='single'
                            >
                                Delete this demo
                            </DeleteButton>}
                        {(mode !== 'owner' || mode !== 'admin') &&
                            <Link to={`/demos/${demo.demoId}/report`}>Report this demo</Link>}
                            </article>
                </section>}
        </>);
}

export default DemoDetails;