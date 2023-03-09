import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {AuthContext} from '../../../context/AuthContext';
import styles from './AudioFileDetails.module.css';
import FavButton from "../../otherComponents/buttons/FavButton/FavButton";
import DeleteButton from "../../otherComponents/buttons/DeleteButton/DeleteButton";
import {DateTime} from "../../../helpers/dateTimeHelper";
import {GetRequest, PutRequest} from "../../../helpers/axiosHelper";

function AudioFileDetails({audioFile, mode}) { // mode: 'admin'
    const {user} = useContext(AuthContext);
    const dateTimeCreated = new DateTime(audioFile.createdDate);
    const createdDate = dateTimeCreated.getDateString();
    const createdTime = dateTimeCreated.getTimeString();

    const scheme = process.env.REACT_APP_SERVER_SCHEME;
    const domain = process.env.REACT_APP_SERVER_DOMAIN;
    const port = process.env.REACT_APP_SERVER_PORT;
    const url = `/demos/${audioFile.demo.demoId}/download`;
    const fullUrl = scheme + '://' + domain + ':' + port + url;

    useEffect(() => {
        async function fetchAudioFile() {
            {console.log('fullUrl: ',fullUrl)}
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

    function downloadAudioFile() {
        fetch(fullUrl)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = audioFile.originalFileName;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => console.log(error));
    }

    return (
        <>
            <section className="outer-content-container audiofile-specifications">
                <div className="inner-content-container">
                    {Object.keys(audioFile).length > 0 && (<div className="audiofile-specification-details">
                        <h3>Created date</h3>
                        <p>{createdDate}</p>
                        <h3>Created time</h3>
                        <p>{createdTime}</p>
                        <h3>Audio file ID</h3>
                        <p>{audioFile.audioFileId}</p>
                        <h3>File name</h3>
                        <p>{audioFile.originalFileName}</p>
                        <p>
                            <audio controls>
                                <source id="mp3Source" type="audio/mpeg"/>
                                Your browser does not support the audio element.
                            </audio>
                        </p>
                            <p><Link to={`/demos/${audioFile.audioFileId}/edit`}>Edit this demo</Link></p>
                         <p>
                            <button id="downloadBtn" type='button' onClick={downloadAudioFile}>Download mp3 file</button>
                        </p>
                        <h3>demo Id</h3>
                        <p>{audioFile.demo.demoId}</p>
                        <h3>demo title</h3>
                        <p>{audioFile.demo.title}</p>
                        {mode === 'admin' &&
                            <p><DeleteButton entityName='demo' entityId={audioFile.demo.demoId} mode='admin'>Delete</DeleteButton> the demo related to this file</p>}
                        {mode === 'admin' &&  <Link to="/">Back to File control page</Link>}
                    </div>)}
                </div>
            </section>
        </>);
}

export default AudioFileDetails;