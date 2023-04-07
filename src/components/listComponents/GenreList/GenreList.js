import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import FavButton from "../../otherComponents/buttons/FavButton/FavButton";
import styles from './GenreList.module.css';
import {GetRequest} from "../../../helpers/axiosHelper";
import DeleteButton from "../../otherComponents/buttons/DeleteButton/DeleteButton";
import SmartTable from "../../otherComponents/SmartTable/SmartTable";

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
            <SmartTable>
                <thead>
                <tr>
                    <th className='priority-1'>Genre name</th>
                    {(mode === 'admin') && <th className='priority-1'>View</th>}
                </tr>
                </thead>
                <tbody>
                {genres.map((genre) => {
                    {
                        console.log('genre: ', genre)
                    }
                    return <tr key={genre.name}>
                        {mode !== 'admin' && <td className='priority-1'><Link to={`/demos/bygenre?genre=${genre.name}&limit=0`}>{genre.name}</Link></td>}
                        {mode === 'admin' && <td className='priority-1'>{genre.name}</td>}
                        {(mode === 'admin') && <td className='priority-1'><Link to={`/admin/genres/${genre.name}`}>View</Link></td>}
                    </tr>
                })}
                {genres.length === 0 && <p>There are no genres that match your search criteria...</p>}
                </tbody>
            </SmartTable>
        </>
    );
}

export default GenreList;