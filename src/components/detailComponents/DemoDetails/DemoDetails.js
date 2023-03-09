import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {AuthContext} from '../../../context/AuthContext';
import styles from './DemoDetails.module.css';
import FavButton from "../../otherComponents/buttons/FavButton/FavButton";
import axios from "axios";
import DeleteButton from "../../otherComponents/buttons/DeleteButton/DeleteButton";
import {DateTime} from "../../../helpers/dateTimeHelper";

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
                    const blob = new Blob([buffer], { type: 'audio/mpeg' });
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
            <section className="outer-content-container demo-specifications">
                <div className="inner-content-container">
                    {demo && (<div className="demo-specification-details">
                        <h3>Created date</h3>
                        <p>{createdDate}</p>
                        <h3>Created time</h3>
                        <p>{createdTime}</p>
                        <h3>Title</h3>
                        <p>{demo.title}</p>
                        <h3>producer</h3>
                        { mode !== 'owner' && <p><Link to={`/users/${demo.user.username}/profile`}>{demo.user.username}</Link></p>}
                        { mode === 'owner' && <p>{demo.user.username}</p>}
                        <h3>Length</h3>
                        <p>{demo.length}</p>
                        <h3>BPM</h3>
                        <p>{demo.bpm}</p>
                        <h3>Genre</h3>
                        <p>{demo.genre.name}</p>
                        <h3>audio file ID</h3>
                        <p>{demo.audioFile.audioFileId}</p>
                        <h3>Filename</h3>
                        <p>{demo.audioFile.originalFileName}</p>
                        <p>
                            <audio controls>
                                <source id="mp3Source" type="audio/mpeg"/>
                                Your browser does not support the audio element.
                            </audio>
                        </p>
                        {user && <span><strong>Favorite list:</strong><FavButton demoId={demo.demoId}></FavButton></span>}
                        {/*Only show this link if You arre logged in and the demo it is YOUR demo*/}
                        {(user && (user.username === demo.user.username)) &&
                            <p><Link to={`/demos/${demo.demoId}/edit`}>Edit this demo</Link></p>}
                        {/*only show this link if you are logged in and it is NOT your demo*/}
                        {(user && (user.username === demo.user.username)) &&
                            <p><Link to={`/demos/${demo.demoId}/inquire`}>Inquire about this demo</Link></p>}
                         <p>
                            <button id="downloadBtn" type='button' onClick={downloadDemo}>Download mp3 file</button>
                        </p>
                        {(mode === 'owner' || mode === 'admin') &&
                            <p><DeleteButton entityName='demo' entityId={demo.demoId} mode='admin'>Delete this
                                demo</DeleteButton></p>}
                        <p><Link onClick={() => window.history.back()} to="#">{` <<Back`}</Link></p>

                    </div>)}
                </div>
            </section>
        </>);
}

export default DemoDetails;