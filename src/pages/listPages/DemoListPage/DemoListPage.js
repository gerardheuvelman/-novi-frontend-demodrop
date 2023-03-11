import React, {useContext, useEffect, useState} from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import {AuthContext} from "../../../context/AuthContext";
import DemoList from "../../../components/listComponents/DemoList/DemoList";
import styles from './DemoListPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {Link, useLocation, useParams} from "react-router-dom";

function DemoListPage({mode}) { // Values for "mode":  'anon', 'user', 'personal', 'owner', 'genre', 'fav', or 'admin'
    const {user} = useContext(AuthContext);
    const location = useLocation();
    const [genre, setGenre] = useState(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const genreParam = queryParams.get('genre');
        setGenre(genreParam || '');
    }, [location.search]);
    console.log('Genre from query string: ',genre);

    return (
        <>
            <Header>
                {mode === 'anon' || mode === 'user' && <h1>Main demo list</h1>}
                {mode === 'personal' && <h1>Personal Demo list</h1>}
                {mode === 'owner' && <h1>My demo's</h1>}
                {mode === 'fav' && <h1>My Favorite demos</h1>}
                {mode === 'genre' && <h1>Demos by genre</h1>}
                {mode === 'admin' && <h1>Demo list (admin mode)</h1>}
                {mode === 'anon' || mode === 'user' && <h4>a list of all uploaded demos</h4>}
                {mode === 'personal' && <h4>a list of demos produced by {user.username}</h4>}
                {mode === 'owner' && <h4>a list of demos produced by me</h4>}
                {mode === 'fav' && <h4>a list of {user.username}'s favorite demos</h4>}
                {mode === 'genre' && <h4>a list of all demos of genre {genre}</h4>}
                {mode === 'admin' && <h4>Full CRUD access to all demos</h4>}
            </Header>
            <main>
                <div className="page-container">
                    <DemoList mode={mode} limit={0} genre={{genre}}/>
                </div>
                <p><Link onClick={() => window.history.back()} to="#">{` <<Back`}</Link></p>
            </main>
            <Footer/>
        </>
    );
}

export default DemoListPage;