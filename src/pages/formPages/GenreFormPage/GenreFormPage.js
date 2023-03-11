import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import styles from './GenreFormPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {GetRequest} from "../../../helpers/axiosHelper";
import GenreForm from "../../../components/formComponents/GenreForm/GenreForm";

function GenreFormPage({mode, type}) { // modes : 'admin; types: 'create' or 'update'
    const {genreName} = useParams();
    const [genre, setGenre] = useState(null);

    useEffect(() => {
        async function fetchGenre() {
            const response = await new GetRequest(`/genres/${genreName}`).invoke();
            setGenre(response.data);
        }
        if (type === 'update')
        void fetchGenre();
    }, []);

    useEffect(() => {
        function setGenreToBlankGenre() {
            const blankGenre = {
                name: null,
            };
            setGenre(blankGenre);
        }
        if (type === 'create')
            void setGenreToBlankGenre();
    }, []);

    return (
    <>
        <Header>
            {type === 'create' &&
                <>
                    {mode  === 'admin' && <h1>Create new Genre</h1>}
                    {mode  === 'admin' && <h2>create a new music genre</h2>}
                </>}
            {type === 'update' &&
                <>
                    <h1>Edit Genre</h1>
                    <h2>{`Edit form for genre "${genreName}"`}</h2>
                </>}
        </Header>
        <main>
            {genre && <GenreForm mode={mode} type={type} prefillGenre={genre} />}
            <p><Link onClick={() => window.history.back()} to="#">{` <<Back`}</Link></p>
        </main>
        <Footer/>
    </>
  );
}

export default GenreFormPage;