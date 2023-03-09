import React, {useContext} from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import {AuthContext} from "../../../context/AuthContext";
import GenreList from "../../../components/listComponents/GenreList/GenreList";
import styles from './GenreListPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {Link} from "react-router-dom";

function GenreListPage({mode, limit}) { // Values for "mode":  'anon',  'admin'
    const {user} = useContext(AuthContext);

    return (
        <>
            <Header>
                {mode === 'anon' && <h1>Music Genres</h1>}
                {mode === 'admin' && <h1>Genre list (admin mode)</h1>}
                {mode === 'anon' && <h4>Click on a genre to see a list of demos of that genre</h4>}
                {mode === 'admin' && <h4>full CRUD access to music genres</h4>}
            </Header>
            <main>
                <div className="page-container">
                    <GenreList mode={mode} limit={limit}></GenreList>
                </div>
                <p><Link onClick={() => window.history.back()} to="#">{` <<Back`}</Link></p>
            </main>
            <Footer/>
        </>
    );
}

export default GenreListPage;