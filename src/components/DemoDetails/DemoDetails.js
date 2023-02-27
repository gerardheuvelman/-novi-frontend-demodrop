import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import styles from './DemoDetails.module.css';
import FavButton from "../FavButton/FavButton";
import axios from "axios";
import DeleteButton from "../DeleteButton/DeleteButton";
import {GetRequest} from "../../helpers/axiosHelper";

function DemoDetails({demo, mode}) { // mode: 'anon' 'user', 'personal' or 'admin'
    const {user} = useContext(AuthContext);
    console.log('DemoDetails received the following demo parameter: ', demo);
    console.log('DemoDetails received the following mode parameter: ', mode);

    function downloadDemo() {
        const audioFileId = demo.audioFile.audioFileId;
        void fetchAudioFile();

        async function fetchAudioFile() {
            const response = await new GetRequest(`/audiofiles/${audioFileId}`).invoke();
            const downloadedFile = response.data;
            // Now, create file link in browser's memory
            const href = URL.createObjectURL(response.data);
            // create "a" HTML element with href to file & click it programmatically
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', downloadedFile.originalFilename); //or any other extension
            document.body.appendChild(link);
            link.click();
            // clean up "a" element & remove ObjectURL
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        }
    }

    return (
        <>
            <section className="outer-content-container demo-specifications">
                <div className="inner-content-container">
                    {Object.keys(demo).length > 0 && (
                        <div className="demo-specification-details">
                            <h3>Created date</h3>
                            <p>{demo.createdDate}</p>
                            <h3>Title</h3>
                            <p>{demo.title}</p>
                            <h3>producer</h3>
                            <p>{demo.user.username}</p><h3>Length</h3>
                            <p>{demo.length}</p>
                            <h3>BPM</h3>
                            <p>{demo.bpm}</p>
                            <h3>audio file ID</h3>
                            <p>{demo.audioFile.audioFileId}</p>
                            <h3>Filename</h3>
                            <p>{demo.audioFile.originalFileName}</p>
                            <h3>Genre</h3>
                            <p>{demo.genre.name}</p>

                            <span>
                    <h3>Favorite list:</h3>
                                {user && <FavButton demoId={demo.demoId}></FavButton>}
                  </span>
                            {/*Only show this link if it is YOUR demo*/}
                            {(user.username === demo.user.username) &&
                                <p><Link to={`/demos/${demo.demoId}/edit`}>Edit this demo</Link></p>}
                            {/*only show this link if it is NOT your demo*/}
                            {(user.username !== demo.user.username) &&
                                <p><Link to={`/demos/${demo.demoId}/inquire`}>Inquire about this demo</Link></p>}
                            <p>
                                <button onClick={downloadDemo}>Download mp3 file</button>
                            </p>
                            {(mode === 'personal' || mode === 'admin') &&
                                <p><DeleteButton entitiesName='demos' entityId={demo.demoId} mode='admin'>Delete this
                                    demo</DeleteButton></p>}
                            <Link to="/">Back to home</Link>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default DemoDetails;