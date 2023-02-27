import React, {useContext} from 'react';
import Header from "../../components/Header/Header";
import {AuthContext} from "../../context/AuthContext";
import GenreList from "../../components/GenreList/GenreList";
import styles from './GenreListPage.module.css';
import Footer from "../../components/Footer/Footer";

function GenreListPage({mode, limit}) { // Values for "mode":  'admin'
    const {user} = useContext(AuthContext);

    return (
        <>
            <Header>
                {mode === 'admin' && <h1>Genre list (admin mode)</h1>}
                {mode === 'admin' && <h4>full CRUD access to music genres</h4>}
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