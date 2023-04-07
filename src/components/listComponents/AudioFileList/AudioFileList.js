import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import styles from './AudioFileList.module.css';
import {GetRequest} from "../../../helpers/axiosHelper";
import {DateTime} from "../../../helpers/dateTimeHelper";
import SmartTable from "../../otherComponents/SmartTable/SmartTable";

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
            <SmartTable>
                <thead>
                <tr>
                    <th className='priority-6'>Date</th>
                    <th className='priority-9'>Time</th>
                    <th className='priority-8'>Audiofile ID</th>
                    <th className='priority-1'>Original filename</th>
                    <th className='priority-7'>Demo Title</th>
                    {(mode === 'admin') && <th className='priority-1'>View</th>}
                    {(mode === 'admin') && <th className='priority-10'>Edit</th>}
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
                        <td className='priority-6'>{dateTimeCreated.getDateString()}</td>
                        <td className='priority-9'>{dateTimeCreated.getTimeString()}</td>
                        {mode === 'admin' &&
                            <td className='priority-8'>{audioFile.audioFileId}</td>}
                        <td className='priority-1'>{audioFile.originalFileName}</td>
                        {audioFile.demo ? <td className='priority-7'><Link to={`/admin/demos/${audioFile.demo.demoId}`}>{audioFile.demo.title}</Link></td> : 'null'}
                        {(mode === 'admin') &&
                            <td className='priority-1'><Link to={`/admin/audiofiles/${audioFile.audioFileId}`}>View</Link></td>}
                        {(mode === 'admin') &&
                            <td className='priority-10'><Link to={`/admin/audiofiles/${audioFile.audioFileId}/edit`}>Rename</Link></td>}
                    </tr>
                })}
                {audioFiles.length === 0 && <p>There are no audio files that match your search criteria...</p>}
                </tbody>
            </SmartTable>

        </>
    )
        ;
}

export default AudioFileList;