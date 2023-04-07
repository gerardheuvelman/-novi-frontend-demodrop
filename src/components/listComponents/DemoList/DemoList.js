import React, {useContext, useEffect, useState} from 'react';
import {Link, useLocation, useParams} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import FavButton from "../../otherComponents/buttons/FavButton/FavButton";
import {GetRequest} from "../../../helpers/axiosHelper";
import {DateTime} from "../../../helpers/dateTimeHelper";
import SmartTable from "../../otherComponents/SmartTable/SmartTable";
import './DemoList.css';

function DemoList({mode, limit, genre, query}) { // modes:  'anon', 'user', 'personal', 'owner', 'fav','query', 'genre' or 'admin'
    const [demos, setDemos] = useState([]);
    const {isAuth, user} = useContext(AuthContext);
    const userFromParams = useParams();
    const location = useLocation();

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

        if (mode === 'genre' && genre !== null) {
            void fetchDemosByGenre();
            console.log('demos by genre loaded?');
        }
    }, [mode, genre]);

    useEffect(() => {
        async function fetchDemosContaining() {
            const response = await new GetRequest(`/demos/find?query=${query}&limit=${limit}`).invoke();
            setDemos(response.data);
        }

        if (mode === 'query' && query !== null) {
            void fetchDemosContaining();
            console.log('demos from query loaded?');
        }
    }, [mode, query]);

    console.log('demos: ', demos);

    return (
        <>
            <SmartTable>
                <thead>
                <tr>
                    <th className='priority-7'>Date</th>
                    <th className='priority-8'>Time</th>
                    <th className='priority-0'>Title</th>
                    {(mode !== 'personal' && mode !== 'owner') && <th className='priority-6'>Producer</th>}

                    {(mode === 'admin') && <th className='priority-9'>Send message</th>}
                    <th className='priority-4'>Genre</th>

                    {mode !== 'admin' && <th className='priority-5'>BPM</th>}
                    {mode !== 'admin' && <th className='priority-8'>Length</th>}

                    {mode === 'admin' && <th className='priority-10'>File Name</th>}
                    {(isAuth && mode !== 'admin' && mode !== 'owner') && <th className='priority-5'>Favorite</th>}
                    <th className='priority-1'>View</th>
                    {mode === 'admin' && <th className='priority-4'>Edit</th>}


                </tr>
                </thead>
                <tbody>
                {demos.map((demo) => {
                    const dateTimeCreated = new DateTime(demo.createdDate);
                    return <tr key={demo.demoId}>

                        {/*Date*/}
                        <td className='priority-7'>{dateTimeCreated.getDateString()}</td>

                        {/*Time*/}
                        <td className='priority-8'>{dateTimeCreated.getTimeString()}</td>

                        {/*Title*/}
                        {(mode === 'anon' || mode === 'user' || mode === 'fav' || mode === 'genre' || mode === 'query') &&
                            <td className='priority-0'><Link to={`/demos/${demo.demoId}`}>{demo.title}</Link></td>}
                        {mode === 'personal' &&
                            <td className='priority-0'><Link
                                to={`/users/${demo.producer.username}/demos/${demo.demoId}`}>{demo.title}</Link>
                            </td>
                        }
                        {mode === 'owner' &&
                            <td className='priority-0'><Link
                                to={`/users/${demo.producer.username}/mydemos/${demo.demoId}`}>{demo.title}</Link>
                            </td>}
                        {mode === 'admin' && <td className='priority-0'>{demo.title}</td>}


                        {/*Producer*/}
                        {mode !== 'admin'&& demo.producer ?
                                    <>
                                        {mode !== 'personal' && mode !== 'owner' &&
                                        <td className='priority-6'><Link
                                            to={`/users/${demo.producer.username}/profile`}>{demo.producer.username}</Link></td>}
                                        {mode === 'admin' &&
                                            <td className='priority-6'><Link
                                                to={`/admin/users/${demo.producer.username}`}>{demo.producer.username}</Link></td>}
                                    </>
                                    :<td>null</td>}

                        {/*Send Message*/}
                        {(mode === 'admin') &&
                            <td className='priority-9'><Link to={`/admin/demos/${demo.demoId}/sendmessage`}>Create</Link></td>}

                        {/*Genre*/}
                        {demo.genre ? <td className='priority-4'>{demo.genre.name}</td> : <td>null</td>}

                        {/*BPM*/}
                        {mode !== 'admin' && <td className='priority-5'>{demo.bpm}</td>}

                        {/*Length*/}
                        {mode !== 'admin' && <td className='priority-8'>{demo.length}</td>}

                        {/*File Name*/}
                        {mode === 'admin' && <td className='priority-10'>{demo.audioFile.originalFileName}</td>}

                        {/*Favorite?*/}
                        {(isAuth && mode !== 'admin' && mode !== 'owner') &&
                            <td className='priority-5'>
                                {(isAuth && user.username !== demo.producer.username) &&
                                    <FavButton color='red' demoId={demo.demoId}/>}
                            </td>}

                        {/*View*/}
                        {(mode !== 'admin') &&
                            <td className='priority-1'><Link to={`/demos/${demo.demoId}`}>View</Link></td>}
                        {(mode === 'admin') &&
                            <td className='priority-1'><Link to={`/admin/demos/${demo.demoId}`}>View</Link></td>}

                        {/*Edit*/}
                        {(mode === 'admin') &&
                            <td className='priority-4'><Link to={`/admin/demos/${demo.demoId}/edit`}>Edit</Link></td>}

                    </tr>
                })}
                {demos.length === 0 && mode === 'anon' &&
                    <p>No demos found. Try logging in to get broader database access. </p>}
                {demos.length === 0 && mode === 'user' && <p>No demos found...</p>}
                {demos.length === 0 && mode === 'personal' && <p>This user has no active demos...</p>}
                {demos.length === 0 && mode === 'owner' && <p>You currently have no uploaded demos...</p>}
                {demos.length === 0 && mode === 'fav' && <p>You have not favorited any demos...</p>}
                {demos.length === 0 && mode === 'query' &&
                    <p>{`Your search query "${query}" yielded no results...`}</p>}
                {demos.length === 0 && mode === 'genre' && <p>{`There are no demos of genre "${genre.genre}"...`} </p>}
                {demos.length === 0 && mode === 'admin' && <p>No demos in this view...</p>}
                </tbody>
            </SmartTable>
        </>
    );
}

export default DemoList;