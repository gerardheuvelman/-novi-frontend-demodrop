import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import FavButton from "../FavButton/FavButton";
import styles from './DemoList.module.css';
import {GetRequest} from "../../helpers/axiosHelper";
import {DateTime} from "../../helpers/dateTimeHelper";

function DemoList({mode, limit}) { // modes:  'anon', 'personal', 'fav', or 'admin'
    const [demos, setDemos] = useState([]);
    const {isAuth, user} = useContext(AuthContext);

    useEffect(() => {
        async function fetchDemos() {
            const response = await new GetRequest(`/demos?limit=${limit}`).invoke();
            setDemos(response.data);
        }

        if (mode === 'anon' || mode === 'user' || mode === 'admin') {
            void fetchDemos();
        }
    }, []);

    useEffect(() => {
        async function fetchPersonalDemos() {
            const response = await new GetRequest(`/users/${user.username}/demos`).invoke();
            setDemos(response.data);
        }

        if (mode === 'personal') {
            void fetchPersonalDemos();
            console.log('personal demos loaded?')
        }
    }, [mode]);

    useEffect(() => {
        async function fetchFavoriteDemos() {
            const response = await new GetRequest(`/users/${user.username}/favdemos`).invoke();
            setDemos(response.data);
        }
        if (mode === 'fav') {
            void fetchFavoriteDemos();
            console.log('favorite demos loaded?');
        }
    }, [mode]);

    console.log('demos: ', demos);

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Title</th>
                    {mode !== 'personal' && <th>Producer</th>}
                    <th>Genre</th>
                    <th>BPM</th>
                    <th>Length</th>
                    <th>File Name</th>
                    {(mode === 'admin') && <th>Edit</th>}
                    {(user && mode !== 'admin' && mode !== 'personal') && <th>Favorite?</th>}
                </tr>
                </thead>
                <tbody>
                {demos.map((demo) => {
                    const dateTimeCreated = new DateTime(demo.createdDate);

                    // De key moet op het buitenste element staan en uniek zijn
                    return <tr key={demo.demoId}>
                        <td>{dateTimeCreated.getDateString()}</td>
                        <td>{dateTimeCreated.getTimeString()}</td>

                        {(mode === 'anon' || mode === 'fav') && <td><Link to={`/demos/${demo.demoId}`}>{demo.title}</Link></td>}
                        {mode === 'personal' && <td><Link to={`/users/${demo.user.username}/demos/${demo.demoId}`}>{demo.title}</Link></td>}
                        {mode === 'admin' && <td>{demo.title}</td>}

                        {(mode !== 'admin' && mode !== 'personal') && <td><Link to={`/users/${demo.user.username}/profile`}>{demo.user.username}</Link></td>}
                        {mode === 'admin' && <td><Link to={`/admin/users/${demo.user.username}`}>{demo.user.username}</Link></td>}

                        <td>{demo.genre.name}</td>
                        <td>{demo.bpm}</td>
                        <td>{demo.length}</td>
                        <td>{demo.audioFile.originalFileName}</td>
                        {(mode === 'admin') && <td><Link to={`/admin/demos/${demo.demoId}`}>Edit</Link></td>}
                        {(user && mode !== 'admin' && mode !== 'personal') &&
                            <td><FavButton demoId={demo.demoId}></FavButton>
                            </td>}
                    </tr>
                })}
                </tbody>
            </table>
        </>
    );
}

export default DemoList;