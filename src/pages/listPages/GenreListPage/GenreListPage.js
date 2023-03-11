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
                {mode === 'admin' && <h1>Music genres (admin mode)</h1>}
                {mode === 'anon' && <h2>Click on a genre to see a list of demos of that genre</h2>}
                {mode === 'admin' && <h2>full CRUD access to music genres</h2>}
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