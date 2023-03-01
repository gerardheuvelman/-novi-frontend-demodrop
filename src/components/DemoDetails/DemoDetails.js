import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext';
import styles from './DemoDetails.module.css';
import FavButton from "../FavButton/FavButton";
import axios from "axios";
import DeleteButton from "../DeleteButton/DeleteButton";
import {DateTime} from "../../helpers/dateTimeHelper";

function DemoDetails({demo, mode}) { // mode: 'anon' 'user', 'personal' or 'admin'
    const [audioFile, setAudioFile] = useState(null);
    const {user} = useContext(AuthContext);
    const jwt = localStorage.getItem("token");
    console.log('DemoDetails received the following demo parameter: ', demo);
    console.log('DemoDetails received the following mode parameter: ', mode);

    const dateTimeCreated = new DateTime(demo.createdDate);
    const createdDate = dateTimeCreated.getDateString();
    const createdTime = dateTimeCreated.getTimeString();

    useEffect(() => {
        async function fetchAudioFile() {
            // DOt the GET request to fetch tehe file:
            const scheme = process.env.REACT_APP_SERVER_SCHEME;
            const domain = process.env.REACT_APP_SERVER_DOMAIN;
            const port = process.env.REACT_APP_SERVER_PORT;
            const url = `/audiofiles/${demo.audioFile.audioFileId}`;
            const fullUrl = scheme + '://' + domain + ':' + port + url;
            const controller = new AbortController;
            let response;
            try {
                response = await axios.get(fullUrl, {
                    signal: controller.signal, headers: {
                        "Content-Type": 'audio/mpeg', Authorization: `Bearer ${jwt}`,
                    }
                });
                console.log(`GET ${url} yielded the following response: `, response);
                setAudioFile(response.data);

                const audioElement = document.getElementById('myAudio');
                const sourceElement = audioElement.querySelector('source');
                sourceElement.src = response.data.url; // KLOPT DIT??
                console.log('sourceElement.src: ', sourceElement.src);
                audioElement.load();

            } catch (e) {
                console.error(e)
            }
            controller.abort();
            console.log("Cleanup code for GET request has been executed");
        }

        void fetchAudioFile();
    }, []);

    function downloadDemo() {
        const audioFileId = demo.audioFile.audioFileId;
        // Do more..

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

                        <p><audio controls><source type="audio/mpeg" id="myAudio"/></audio></p>

                        {user && <span><strong>Favorite list:</strong><FavButton demoId={demo.demoId}></FavButton></span>}
                        {/*Only show this link if it is YOUR demo*/}
                        {(user.username === demo.user.username) &&
                            <p><Link to={`/demos/${demo.demoId}/edit`}>Edit this demo</Link></p>}
                        {/*only show this link if it is NOT your demo*/}
                        {(user.username !== demo.user.username) &&
                            <p><Link to={`/demos/${demo.demoId}/inquire`}>Inquire about this demo</Link></p>}
                        {audioFile && <p>
                            <button type='button' onClick={downloadDemo}>Download mp3 file</button>
                        </p>}
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