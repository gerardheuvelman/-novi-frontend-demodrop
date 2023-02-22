import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import styles from './DemoDetails.module.css';
import FavButton from "../FavButton/FavButton";
import axios from "axios";

function DemoDetails({demo}) {
    const {user} = useContext(AuthContext);
    console.log('DemoDetails received the following demo parameter: ', demo);

    function downloadDemo() {
        const audioFileId = demo.audioFile.audioFileId;
        const controller = new AbortController();
        const storedToken = localStorage.getItem("token");

        async function fetchAudioFile() {
            try {
                const response = await axios.get(`http://localhost:8080/audiofiles/${audioFileId}`, {
                    responseType: 'blob', // IMPORTANT!!
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${storedToken}`,
                    },
                    signal: controller.signal
                });
                console.log(`GET http://localhost:8080/audiofiles/${audioFileId} yielded the following response`, response.data);
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

            } catch (e) {
                console.log(e)
            }
        }

        void fetchAudioFile();
        return function cleanup() {
            controller.abort(); // <--- cancel request
            console.log("Cleanup has been executed")
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
                            <Link to="/">Back to home</Link>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default DemoDetails;