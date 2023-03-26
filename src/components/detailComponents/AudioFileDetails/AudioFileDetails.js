import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {AuthContext} from '../../../context/AuthContext';
import styles from './AudioFileDetails.module.css';
import FavButton from "../../otherComponents/buttons/FavButton/FavButton";
import DeleteButton from "../../otherComponents/buttons/DeleteButton/DeleteButton";
import {DateTime} from "../../../helpers/dateTimeHelper";
import {GetRequest, PutRequest} from "../../../helpers/axiosHelper";
import Button from "../../otherComponents/buttons/Button/Button";

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
            {
                console.log('fullUrl: ', fullUrl)
            }
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
            {audioFile && <section className='details-section'>
                <article className='details-info'>
                    <h3>Created date</h3>
                    {createdDate}
                    <h3>Created time</h3>
                    {createdTime}
                    <h3>Audio file ID</h3>
                    {audioFile.audioFileId}
                    <h3>File name</h3>
                    {audioFile.originalFileName}
                    <h3>demo Id</h3>
                    {audioFile.demo.demoId}
                    <h3>demo title</h3>
                    {audioFile.demo.title}
                </article>
                <article className='details-controls'>
                    <audio controls>
                        <source id="mp3Source" type="audio/mpeg"/>
                        Your browser does not support the audio element.
                    </audio>
                    <Link to={`/admin/audiofiles/${audioFile.audioFileId}/edit`}>Rename this audio file</Link>
                    <Button color='white' id="downloadBtn" type='button' onClick={downloadAudioFile}>Download mp3 file</Button>
                    {mode === 'admin' &&
                        <>
                            <span>
                                <DeleteButton
                                    color='white'
                                    entityName='demo'
                                    entityId={audioFile.demo.demoId}
                                    friendlyId={audioFile.demo.title}
                                    mode={mode}
                                >Delete
                                </DeleteButton> the demo
                        related to this file
                            </span>
                            <span>
                                <DeleteButton
                                    color='white'
                                    entityName='audiofile'
                                    entityId={audioFile.audioFileId}
                                    friendlyId={audioFile.originalFileName}
                                    mode={mode}>Delete</DeleteButton> this file. (the mp3 file will persist on disk until orphaned mp3 files are purged)
                            </span>
                        </>}

                    {mode === 'admin' && <Link to="/admin/audiofiles">Back to file control page</Link>}
                </article>
            </section>}
        </>
    );
}

export default AudioFileDetails;