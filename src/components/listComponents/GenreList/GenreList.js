import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import FavButton from "../../otherComponents/buttons/FavButton/FavButton";
import styles from './GenreList.module.css';
import {GetRequest} from "../../../helpers/axiosHelper";
import DeleteButton from "../../otherComponents/buttons/DeleteButton/DeleteButton";

function GenreList({mode, limit}) { // Values for Mode: :  'anon', 'admin'
    const [genres, setGenres] = useState([]);
    const {isAuth, user} = useContext(AuthContext);

    const storedToken = localStorage.getItem('token');
    console.log(storedToken);

    useEffect(() => {
        async function fetchAllGenres() {
            const response = await new GetRequest(`/genres?limit=${limit}`).invoke();
            setGenres(response.data);
        }
        void fetchAllGenres();
        console.log('all genres loaded?')
    }, []);

    console.log('genres: ', genres);

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>Genre name</th>
                    {mode === 'admin' && <th>Delete</th>}
                </tr>
                </thead>
                <tbody>
                {genres.map((genre) => {
                    {
                        console.log('genre: ', genre)
                    }
                    // De key moet op het buitenste element staan en uniek zijn
                    return <tr key={genre.name}>
                        {mode !== 'admin' && <td><Link to={`/demos/bygenre?genre=${genre.name}&limit=0`}>{genre.name}</Link></td>}
                        {mode === 'admin' && <td>{genre.name}</td>}
                        {mode === 'admin' && <td><DeleteButton mode='admin' entityName='genre' entityId={genre.name}/></td>}
                    </tr>
                })}
                </tbody>
            </table>
            {genres.length === 0 && <p>There are no genres that match your search criteria...</p>}
        </>
    );
}

export default GenreList;