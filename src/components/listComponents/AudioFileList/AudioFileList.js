import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import FavButton from "../../otherComponents/buttons/FavButton/FavButton";
import styles from './AudioFileList.module.css';
import {GetRequest} from "../../../helpers/axiosHelper";
import {DateTime} from "../../../helpers/dateTimeHelper";

function AudioFileList({mode, limit}) { // modes: 'admin'
    const [audioFiles, setAudioFiles] = useState([]);
    const {isAuth, user} = useContext(AuthContext);

    useEffect(() => {
        async function fetchAudioFiles() {
            const response = await new GetRequest(`/audiofiles?limit=${limit}`).invoke();
            setAudioFiles(response.data);
        }

        void fetchAudioFiles();
    }, []);

    console.log('audioFiles: ', audioFiles);

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Audiofile ID</th>
                    <th>Original filename</th>
                    <th>Demo ID</th>
                    <th>Demo Title</th>
                    {(mode === 'admin') && <th>Edit</th>}
                </tr>
                </thead>
                <tbody>
                {audioFiles.map((audioFile) => {
                    {
                        console.log('single audioFile: ', audioFile);
                    }
                    const dateTimeCreated = new DateTime(audioFile.createdDate);
                    // De key moet op het buitenste element staan en uniek zijn
                    return <tr key={audioFile.audioFileId}>
                        <td>{dateTimeCreated.getDateString()}</td>
                        <td>{dateTimeCreated.getTimeString()}</td>
                        {mode === 'admin' && <td>{audioFile.audioFileId}</td>}
                        <td>{audioFile.originalFileName}</td>
                        <td><Link to={`/admin/demos/${audioFile.demo.demoId}`}>{audioFile.demo.demoId}</Link></td>
                        <td>{audioFile.demo.title}</td>
                        {(mode === 'admin') && <td><Link to={`/admin/audiofiles/${audioFile.audioFileId}`}>Edit</Link></td>}
                    </tr>
                })}
                </tbody>
            </table>
        </>
    )
        ;
}

export default AudioFileList;