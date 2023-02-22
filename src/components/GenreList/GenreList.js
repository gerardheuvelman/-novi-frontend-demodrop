import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import FavButton from "../FavButton/FavButton";
import styles from './GenreList.module.css';

function GenreList({mode, limit}) { // Values for Mode: :  'all'
    const [genres, setGenres] = useState([]);
    const {isAuth, user} = useContext(AuthContext);

    const storedToken = localStorage.getItem('token');
    console.log(storedToken);

    useEffect(() => {
        async function fetchAllGenres() {
            try {
                const response = await axios.get(  `http://localhost:8080/genres?limit=${limit}`);
                console.log(`GET /genres?limit=${limit} yielded the following response: `, response.data);
                setGenres(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        if (mode === 'all') {
            void fetchAllGenres();
            console.log('all genres loaded?')
        }
    }, [mode]);
    
    console.log('genres: ', genres);

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>Genre name</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {genres.map((genre) => {
                    {console.log('genre: ', genre)}
                    // De key moet op het buitenste element staan en uniek zijn
                    return <tr key={genre.name}>
                        <td>{genre.name}</td>
                        <td><Link to={`/genres/delete/${genre.genreId}`}>Delete</Link></td>
                    </tr>
                })}
                </tbody>
            </table>
        </>
    );
}

export default GenreList;