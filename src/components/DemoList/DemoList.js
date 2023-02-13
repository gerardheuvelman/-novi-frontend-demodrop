import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import './DemoList.css';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import FavButton from "../FavButton/FavButton";
import styles from './DemoList.module.scss';

function DemoList({mode, limit}) { // VALUES:  'all ', 'personal' or 'fav'
    const [demos, setDemos] = useState([]);
    const {isAuth, user} = useContext(AuthContext);

    const storedToken = localStorage.getItem('token');
    console.log(storedToken);

    useEffect(() => { // TODO: Moderniseren
        async function fetchAllDemos() {
            try {
                const response = await axios.get(  `http://localhost:8080/demos?limit=${limit}`);
                console.log(response.data);
                console.log(response.data.genre)
                setDemos(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        if (mode === 'all') {
            void fetchAllDemos();
            console.log('all demos loaded?')
        }
    }, [mode]);

    useEffect(() => { // TODO: Moderniseren
        async function fetchPersonalDemos(storedToken) {
            try {
                const response = await axios.get(`http://localhost:8080/users/${user.username}/demos`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${storedToken}`
                    }
                });
                console.log(response.data);
                setDemos(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        if (mode === 'personal') {
            void fetchPersonalDemos(storedToken);
            console.log('personal demos loaded?')
        }
    }, [mode]);

    useEffect(() => { // TODO: Moderniseren
        async function fetchFavoriteDemos(storedToken) {
            try {
                const response = await axios.get(`http://localhost:8080/users/${user.username}/favdemos`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${storedToken}`
                    }
                });
                console.log(response.data);
                setDemos(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        if (mode === 'fav') {
            void fetchFavoriteDemos(storedToken);
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
                    <th>Title</th>
                    <th>Genre</th>
                    <th>BPM</th>
                    <th>Length</th>
                    {mode === 'personal' && <th>Edit</th>}
                    {mode === 'personal' && <th>Delete</th>}
                    {user && <th>Favorite?</th>}
                </tr>
                </thead>
                <tbody>
                {demos.map((demo) => {


                    // De key moet op het buitenste element staan en uniek zijn
                    return <tr key={demo.demoId}>
                        <td>{demo.createdDate}</td>
                        <td><Link to={`/demos/${demo.demoId}`}>{demo.title}</Link></td>
                        <td>{demo.genre.name}</td>
                        <td>{demo.bpm}</td>
                        <td>{demo.length}</td>
                        {mode === 'personal' && <td><Link to={`/demos/edit/${demo.demoId}`}>Edit</Link></td>}
                        {mode === 'personal' && <td><Link to={`/demos/delete/${demo.demoId}`}>Delete</Link></td>}
                        {user && <td><FavButton demoId={demo.demoId}></FavButton>
                        </td>}
                    </tr>
                })}
                </tbody>
            </table>
        </>
    );
}

export default DemoList;