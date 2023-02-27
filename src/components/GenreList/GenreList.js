import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import FavButton from "../FavButton/FavButton";
import styles from './GenreList.module.css';
import {GetRequest} from "../../helpers/axiosHelper";

function GenreList({mode, limit}) { // Values for Mode: :  'admin'
    const [genres, setGenres] = useState([]);
    const {isAuth, user} = useContext(AuthContext);

    const storedToken = localStorage.getItem('token');
    console.log(storedToken);

    useEffect(() => {
        async function fetchAllGenres() {
            const response = await new GetRequest(`/genres?limit=${limit}`).invoke();
            setGenres(response.data);
        }

        if (mode === 'admin') {
            void fetchAllGenres();
            console.log('all genres loaded?')
        }
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
                        <td>{genre.name}</td>
                        {mode === 'admin' && <td><Link to={`/genres/delete/${genre.genreId}`}>Delete</Link></td>}
                    </tr>
                })}
                </tbody>
            </table>
        </>
    );
}

export default GenreList;