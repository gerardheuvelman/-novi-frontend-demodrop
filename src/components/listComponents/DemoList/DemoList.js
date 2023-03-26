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
                    <th className='priority-4'>Date</th>
                    <th className='priority-6'>Time</th>
                    <th className='priority-2'>Title</th>
                    {(mode !== 'personal' && mode !== 'owner') && <th className='priority-2'>Producer</th>}
                    {(mode === 'admin') && <th className='priority-2'>Send message</th>}
                    <th className='priority-4'>Genre</th>
                    {mode !== 'admin' && <th className='priority-4'>BPM</th>}
                    {mode !== 'admin' && <th className='priority-6'>Length</th>}
                    {mode === 'admin' && <th className='priority-8'>File Name</th>}
                    {mode === 'admin' && <th className='priority-2'>View</th>}
                    {mode === 'admin' && <th className='priority-4'>Edit</th>}
                    {(isAuth && mode !== 'admin' && mode !== 'owner') && <th className='priority-6'>Favorite?</th>}
                </tr>
                </thead>
                <tbody>
                {demos.map((demo) => {
                    const dateTimeCreated = new DateTime(demo.createdDate);
                    return <tr key={demo.demoId}>
                        <td className='priority-4'>{dateTimeCreated.getDateString()}</td>
                        <td className='priority-6'>{dateTimeCreated.getTimeString()}</td>
                        {(mode === 'anon' || mode === 'user' || mode === 'fav' || mode === 'genre' || mode === 'query') &&
                            <td className='priority-2'><Link to={`/demos/${demo.demoId}`}>{demo.title}</Link></td>}
                        {mode === 'personal' &&
                            <td className='priority-2'><Link
                                to={`/users/${demo.user.username}/demos/${demo.demoId}`}>{demo.title}</Link></td>}
                        {mode === 'owner' &&
                            <td className='priority-2'><Link
                                to={`/users/${demo.user.username}/mydemos/${demo.demoId}`}>{demo.title}</Link>
                            </td>}
                        {mode === 'admin' && <td className='priority-2'>{demo.title}</td>}
                        {(mode !== 'admin' && (mode !== 'personal' && mode !== 'owner')) &&
                            <td className='priority-2'><Link
                                to={`/users/${demo.user.username}/profile`}>{demo.user.username}</Link></td>}
                        {mode === 'admin' &&
                            <td className='priority-2'><Link
                                to={`/admin/users/${demo.user.username}`}>{demo.user.username}</Link></td>}
                        {(mode === 'admin') && <Link to={`/admin/demos/${demo.demoId}/sendmessage`}>New message</Link>}
                        <td className='priority-4'>{demo.genre.name}</td>
                        {mode !== 'admin' && <td className='priority-4'>{demo.bpm}</td>}
                        {mode !== 'admin' && <td className='priority-6'>{demo.length}</td>}
                        {mode === 'admin' && <td className='priority-8'>{demo.audioFile.originalFileName}</td>}
                        {(mode === 'admin') &&
                            <td className='priority-2'><Link to={`/admin/demos/${demo.demoId}`}>View</Link></td>}
                        {(mode === 'admin') &&
                            <td className='priority-4'><Link to={`/admin/demos/${demo.demoId}/edit`}>Edit</Link></td>}
                        {(isAuth && mode !== 'admin' && mode !== 'owner') &&
                            <td className='priority-6'>
                                {(isAuth && user.username !== demo.user.username) &&
                                    <FavButton color='red' demoId={demo.demoId}/>}
                            </td>}
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