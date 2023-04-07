import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {AuthContext} from '../../../context/AuthContext';
import styles from './AudioFileDetails.module.css';
import FavButton from "../../otherComponents/buttons/FavButton/FavButton";
import DeleteButton from "../../otherComponents/buttons/DeleteButton/DeleteButton";
import {DateTime} from "../../../helpers/dateTimeHelper";
import {GetRequest, PutRequest} from "../../../helpers/axiosHelper";
import Button from "../../otherComponents/buttons/Button/Button";
import Audio from "../../otherComponents/Audio/Audio";

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
                    <h4>Created date</h4>
                    {createdDate}
                    <h4>Created time</h4>
                    {createdTime}
                    <h4>Audio file ID</h4>
                    {audioFile.audioFileId}
                    <h4>File name</h4>
                    {audioFile.originalFileName}
                    <h4>demo Id</h4>
                    {audioFile.demo.demoId}
                    <h4>demo title</h4>
                    {audioFile.demo.title}
                </article>
                <article className='details-controls'>
                    <h3>Available actions</h3>
                    <Audio source={"mp3Source"}/>
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
                                    type='single'
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
                                    mode={mode}
                                    type='single'
                                >
                                    Delete
                                </DeleteButton> this file. (the mp3 file will persist on disk until orphaned mp3 files are purged)
                            </span>
                        </>}

                    {mode === 'admin' && <Link to="/admin/audiofiles">Back to file control page</Link>}
                </article>
            </section>}
        </>
    );
}

export default AudioFileDetails;