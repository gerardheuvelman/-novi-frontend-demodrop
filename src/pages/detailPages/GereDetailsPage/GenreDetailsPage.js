import React, {useContext, useEffect, useState} from 'react';
import {Link, NavLink, useParams} from 'react-router-dom';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import styles from './GenreDetailsPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {GetRequest} from "../../../helpers/axiosHelper";
import UserDetails from "../../../components/detailComponents/UserDetails/UserDetails";
import DemoList from "../../../components/listComponents/DemoList/DemoList";
import GenreDetails from "../../../components/detailComponents/GenreDetails/GenreDetails";

function GenreDetailsPage({mode}) { // modes: 'admin'
    const {genreName} = useParams(); // Used to fetch genre details
    const [genreDetails, setGenreDetails] = useState(null);
    console.log('GenreDetailsPage mode: ', mode);
    console.log('GenreDetailsPage genreName: ', genreName);


    useEffect(() => {
            async function fetchGenreDetails() {
                const response = await new GetRequest(`/genres/${genreName}`).invoke();
                setGenreDetails(response.data);
            }
            void fetchGenreDetails();
        }, [])

    return (
        <>
            <Header>
                {mode === 'admin' && <h1>Genre details (admin mode)</h1>}
                {mode === 'admin' && <h4>{`...for genre ${genreName}`}</h4>}
            </Header>
            {genreDetails &&
                <main>
                    <GenreDetails genreDetails={genreDetails} mode={mode}/>
                     <DemoList mode={mode} genre={genreName} limit={0}/>
                    <p><Link onClick={() => window.history.back()} to="#">{` <<Back`}</Link></p>
                </main>
            }
            <Footer/>
        </>
    );
}

export default GenreDetailsPage;