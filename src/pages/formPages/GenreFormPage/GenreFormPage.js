import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import styles from './GenreFormPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {GetRequest} from "../../../helpers/axiosHelper";
import GenreForm from "../../../components/formComponents/GenreForm/GenreForm";
import MainComponent from "../../../components/otherComponents/structuralComponents/MainComponent/MainComponent";

function GenreFormPage({mode, type}) { // modes : 'admin' or others; types: 'create' or 'update'
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
        {genre &&
            <>
            <Header>
                {type === 'create' &&
                    <>
                        {mode  === 'admin' && <h3>Create new Genre</h3>}
                        {mode  === 'admin' && <h4>create a new music genre</h4>}
                    </>}
                {type === 'update' &&
                    <>
                        <h3>Edit Genre</h3>
                        <h4>{`Edit form for genre "${genreName}"`}</h4>
                    </>}
            </Header>
            <MainComponent>
                {genre && <GenreForm mode={mode} type={type} prefillGenre={genre} />}
            </MainComponent>
            <Footer/>
        </>}
    </>
  );
}

export default GenreFormPage;