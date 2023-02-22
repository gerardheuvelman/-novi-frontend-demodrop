import React, {useContext} from 'react';
import Header from "../../components/Header/Header";
import {AuthContext} from "../../context/AuthContext";
import DemoList from "../../components/DemoList/DemoList";
import styles from './DemoListPage.module.css';
import Footer from "../../components/Footer/Footer";

function DemoListPage({mode, limit}) { // Values for "mode":  'all ', 'personal' or 'fav'
    const {user} = useContext(AuthContext);

    return (
        <>
            <Header>
                {mode === 'all' && <h1>Demo list</h1>}
                {mode === 'personal' && <h1>Personal Demo list</h1>}
                {mode === 'fav' && <h1>Favorite Demo list</h1>}
                {mode === 'all' && <h4>a list of all our demos</h4>}
                {mode === 'personal' && <h4>a list of demos produced by {user.username}</h4>}
                {mode === 'fav' && <h4>a list of {user.username}'s favorite demos</h4>}
            </Header>
            <main>
                <div className="page-container">
                    <DemoList mode={mode} limit={limit}></DemoList>
                </div>
            </main>
            <Footer/>
        </>
    );
}

export default DemoListPage;