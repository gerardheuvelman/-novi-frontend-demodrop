import React, {useContext} from 'react';
import Header from "../../components/Header/Header";
import {AuthContext} from "../../context/AuthContext";
import GenreList from "../../components/GenreList/GenreList";
import styles from './GenreListPage.module.css';
import Footer from "../../components/Footer/Footer";

function GenreListPage({mode, limit}) { // Vavules for "mode":  'all'
    const {user} = useContext(AuthContext);

    return (
        <>
            <Header>
                {mode === 'all' && <h1>Genre list</h1>}
                {mode === 'all' && <h4>a list of all music genres</h4>}
            </Header>
            <main>
                <div className="page-container">
                    <GenreList mode={mode} limit={limit}></GenreList>
                </div>
            </main>
            <Footer/>
        </>
    );
}

export default GenreListPage;