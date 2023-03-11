import React, {useContext, useEffect, useState} from 'react';
import {Link, useLocation, useParams} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import FavButton from "../../otherComponents/buttons/FavButton/FavButton";
import styles from './DemoList.module.css';
import {GetRequest} from "../../../helpers/axiosHelper";
import {DateTime} from "../../../helpers/dateTimeHelper";

function DemoList({mode, limit, genre}) { // modes:  'anon', 'user', 'personal', 'owner', 'fav', or 'admin'
    const [demos, setDemos] = useState([]);
    const {isAuth, user} = useContext(AuthContext);
    const userFromParams = useParams();
    const location = useLocation();
    // const [genre, setGenre] = useState(null);

    console.log('Mode of DemoList component: ', mode);
    console.log('Genre of DemoList component: ', genre);

    useEffect(() => {
        async function fetchDemos() {
            const response = await new GetRequest(`/demos?limit=${limit}`).invoke();
            setDemos(response.data);
        }

        if (mode === 'anon' || mode === 'user' || mode === 'admin') {
            void fetchDemos();
        }
    }, [mode]);

    useEffect(() => {
        async function fetchMyDemos() {
            const response = await new GetRequest(`/users/${user.username}/demos`).invoke();
            setDemos(response.data);
        }
        if (mode === 'owner') {
            void fetchMyDemos();
            console.log('my demos loaded?')
        }
    }, [mode]);

    useEffect(() => {
        async function fetchPersonalDemos() {
            const response = await new GetRequest(`/users/${userFromParams.username}/demos`).invoke();
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

    useEffect(() => {
        async function fetchDemosByGenre() {
            const response = await new GetRequest(`/demos/bygenre?genre=${genre.genre}&limit=${limit}`).invoke();
            setDemos(response.data);
        }
        if (mode === 'genre' && genre!== null) {
            void fetchDemosByGenre();
            console.log('demos by genre loaded?');
        }
    }, [mode, genre]);


    console.log('demos: ', demos);

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Title</th>
                    {(mode !== 'personal' && mode !== 'owner') && <th>Producer</th>}
                    <th>Genre</th>
                    <th>BPM</th>
                    <th>Length</th>
                    {mode !== 'anon' && <th>File Name</th>}
                    {(mode === 'admin') && <th>View</th>}
                    {(mode === 'admin') && <th>Edit</th>}
                    {(isAuth && mode !== 'admin' && mode !== 'owner') && <th>Favorite?</th>}
                </tr>
                </thead>
                <tbody>
                {demos.map((demo) => {
                    const dateTimeCreated = new DateTime(demo.createdDate);
                    return <tr key={demo.demoId}>
                        <td>{dateTimeCreated.getDateString()}</td>
                        <td>{dateTimeCreated.getTimeString()}</td>

                        {(mode === 'anon' || mode === 'user' || mode === 'fav' || mode ==='genre') &&
                            <td><Link to={`/demos/${demo.demoId}`}>{demo.title}</Link></td>}
                        {mode === 'personal' &&
                            <td><Link to={`/users/${demo.user.username}/demos/${demo.demoId}`}>{demo.title}</Link></td>}
                        {mode === 'owner' &&
                            <td><Link to={`/users/${demo.user.username}/mydemos/${demo.demoId}`}>{demo.title}</Link>
                            </td>}
                        {mode === 'admin' && <td>{demo.title}</td>}


                        {(mode !== 'admin' && (mode !== 'personal' && mode !== 'owner')) &&
                            <td><Link to={`/users/${demo.user.username}/profile`}>{demo.user.username}</Link></td>}
                        {mode === 'admin' &&
                            <td><Link to={`/admin/users/${demo.user.username}`}>{demo.user.username}</Link></td>}


                        <td>{demo.genre.name}</td>
                        <td>{demo.bpm}</td>
                        <td>{demo.length}</td>
                        {mode !== 'anon' && <td>{demo.audioFile.originalFileName}</td>}
                        {(mode === 'admin') && <td><Link to={`/admin/demos/${demo.demoId}`}>View</Link></td>}
                        {(mode === 'admin') && <td><Link to={`/admin/demos/${demo.demoId}/edit`}>Edit</Link></td>}
                        {(isAuth && mode !== 'admin' && mode !== 'owner') &&
                            <td>
                                {(isAuth && user.username !== demo.user.username) && <FavButton demoId={demo.demoId}/>}
                            </td>}
                    </tr>
                })}
                </tbody>
            </table>
            {demos.length === 0 && <p>There are no demos that match your search criteria...</p>}
        </>
    );
}

export default DemoList;