import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import styles from './DemoDetails.module.css';
import FavButton from "../FavButton/FavButton";
import axios from "axios";
import DeleteButton from "../DeleteButton/DeleteButton";
import {DateTime} from "../../helpers/dateTimeHelper";

function DemoDetails({demo, mode}) { // mode: 'anon' 'user', 'personal' or 'admin'
    const {user} = useContext(AuthContext);
    const jwt = localStorage.getItem("token");

    const dateTimeCreated = new DateTime(demo.createdDate);
    const createdDate = dateTimeCreated.getDateString();
    const createdTime = dateTimeCreated.getTimeString();

    const scheme = process.env.REACT_APP_SERVER_SCHEME;
    const domain = process.env.REACT_APP_SERVER_DOMAIN;
    const port = process.env.REACT_APP_SERVER_PORT;
    const url = `/audiofiles/${demo.audioFile.audioFileId}`;
    const fullUrl = scheme + '://' + domain + ':' + port + url;

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
                    {Object.keys(demo).length > 0 && (<div className="demo-specification-details">
                        <h3>Created date</h3>
                        <p>{createdDate}</p>
                        <h3>Created time</h3>
                        <p>{createdTime}</p>
                        <h3>Title</h3>
                        <p>{demo.title}</p>
                        <h3>producer</h3>
                        <p>{demo.user.username}</p><h3>Length</h3>
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
                        {/*Only show this link if it is YOUR demo*/}
                        {(user.username === demo.user.username) &&
                            <p><Link to={`/demos/${demo.demoId}/edit`}>Edit this demo</Link></p>}
                        {/*only show this link if it is NOT your demo*/}
                        {(user.username !== demo.user.username) &&
                            <p><Link to={`/demos/${demo.demoId}/inquire`}>Inquire about this demo</Link></p>}
                         <p>
                            <button id="downloadBtn" type='button' onClick={downloadDemo}>Download mp3 file</button>
                        </p>
                        {(mode === 'personal' || mode === 'admin') &&
                            <p><DeleteButton entitiesName='demos' entityId={demo.demoId} mode='admin'>Delete this
                                demo</DeleteButton></p>}
                        <Link to="/">Back to home</Link>
                    </div>)}
                </div>
            </section>
        </>);
}

export default DemoDetails;