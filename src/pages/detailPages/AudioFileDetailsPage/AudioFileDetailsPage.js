import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import Header from '../../../components/otherComponents/structuralComponents/Header/Header';
import styles from './AudioFileDetailsPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {GetRequest} from "../../../helpers/axiosHelper";
import AudioFileDetails from "../../../components/detailComponents/AudioFileDetails/AudioFileDetails";
import DeleteButton from "../../../components/otherComponents/buttons/DeleteButton/DeleteButton";
import AccountStateToggleButton
    from "../../../components/otherComponents/buttons/AccountStateToggleButton/AccountStateToggleButton";

function AudioFileDetailsPage({mode}) { // mode: 'admin'
    const {audioFileId} = useParams();
    const [audioFile, setAudioFile] = useState(null);

    useEffect(() => {
        async function fetchAudioFile() {
            const response = await new GetRequest(`/audiofiles/${audioFileId}`).invoke();
            setAudioFile(response.data);
        }
        void fetchAudioFile();
    }, []);

    return (
        <>
            {audioFile &&
                <>
                    <Header>
                        {mode === 'admin' && <h1>Audio file specifications (admin mode)</h1>}
                        <h4>{` ...for audio file "${audioFile.audioFileId}"`}</h4>
                    </Header>
                    <main>
                        <section>
                            {audioFile ? <AudioFileDetails audioFile={audioFile} mode={mode}/> : <p>Loading...</p>}
                        </section>
                        {/*{mode === "admin" && <section>*/}
                        {/*    {(mode === 'admin') && <td><Link to={`/admin/audiofiles/${audioFile.audioFileId}/edit`}>Edit this AudioFile</Link></td>}*/}

                        {/*   {(mode === 'owner' || mode === 'admin') && <p><DeleteButton entityName="audiofile" entityId={audioFile.audioFileId} friendlyId={audioFile.originalFileName} mode={mode}>Delete  This audio file</DeleteButton></p>}*/}
                        {/*    {<p>Back to the <Link to="/admin/audiofiles">Audio file list</Link></p>}*/}
                        {/*</section>}*/}

                    </main>
                    <Footer/>
                </>
            }
        </>
    );
}

export default AudioFileDetailsPage;