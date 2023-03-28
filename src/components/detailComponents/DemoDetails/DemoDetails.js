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
                        <h3>Created</h3>
                        <span>
                            {createdDate}  {createdTime}
                        </span>
                        <h3>Title</h3>
                        {demo.title}
                        <h3>producer</h3>
                        {mode !== 'owner' &&
                            <Link to={`/users/${demo.user.username}/profile`}>{demo.user.username}</Link>}
                        {mode === 'owner' && <span>{demo.user.username}</span>}
                        <h3>Length</h3>
                        {demo.length}
                        <h3>BPM</h3>
                        {demo.bpm}
                        <h3>Genre</h3>
                        {demo.genre.name}
                        <h3>audio file ID</h3>
                        {demo.audioFile.audioFileId}
                        <h3>Filename</h3>
                        {demo.audioFile.originalFileName}>
                    </article>
                    <article className='details-controls'>
                        <Audio source={"mp3Source"} />
                        {user &&
                            <span><strong>Favorite list:</strong><FavButton color='white'
                                                                            demoId={demo.demoId}></FavButton></span>}
                        {/*Only show this link if You arre logged in and the demo it is YOUR demo*/}
                        {(user && (user.username === demo.user.username)) &&
                            <Link to={`/demos/${demo.demoId}/edit`}>Edit this demo</Link>}
                        {/*only show this link if you are logged in and it is NOT your demo*/}
                        {(user && (user.username !== demo.user.username)) &&
                            <Link to={`/demos/${demo.demoId}/inquire`}>Inquire about this demo</Link>}
                        <Button color='white' id="downloadBtn" type='button' onClick={downloadDemo}>Download mp3
                            file</Button>
                        {(mode === 'admin') &&
                            <td><Link to={`/admin/demos/${demo.demoId}/edit`}>Edit this demo</Link></td>}
                        {(mode === 'owner' || mode === 'admin') &&
                            <DeleteButton
                                color='white'
                                entityName='demo'
                                entityId={demo.demoId}
                                friendlyId={demo.title}
                                mode={mode}
                            >
                                Delete this demo
                            </DeleteButton>}
                    </article>
                </section>}
        </>);
}

export default DemoDetails;