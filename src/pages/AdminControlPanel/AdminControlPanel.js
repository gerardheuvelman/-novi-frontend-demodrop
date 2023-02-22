import React, {useContext, useState} from 'react';
import Header from "../../components/Header/Header";
import logo from "../../assets/DemoDropLogo.png";
import {Link, redirect} from "react-router-dom";
import {AuthContext} from '../../context/AuthContext';
import UserList from "../../components/UserList/UserList";
import DemoList from "../../components/DemoList/DemoList";
import ConversationList from "../../components/ConversationList/ConversationList";
import styles from './AdminControlPanel.module.css';
import Footer from "../../components/Footer/Footer";
import GenreList from "../../components/GenreList/GenreList";

function AdminControlPanel(props) {
    const [users, setUsers] = useState([]);
    // const {redirect} = redirect();
    const {user} = useContext(AuthContext);
    console.log('User object:', user);

    return (
        <>
            <Header>
                <h1>Admin Control panel</h1>
                <h2>Welcome, {user.username} </h2>
            </Header>
            <main>
                <section className="outer-content-container">
                    <div className="inner-content-container">
                        <h2>Latest users:</h2>
                        <UserList mode='all' limit={6} />
                        <button
                            type="button"
                            onClick={
                            () => {
                                console.log('user control panel button was clicked!');
                                redirect('/admin/users');
                            }}
                        >
                            User Control Panel
                        </button>
                    </div>
                </section>
                <section className="outer-content-container">
                    <div className="inner-content-container">
                        <h2>Latest demos:</h2>
                        <DemoList mode='all' limit={6}/>
                        <button type="button" onClick={() => redirect('/admin/demos')}>Demo Control Panel</button>
                    </div>
                </section>
                <section className="outer-content-container">
                    <div className="inner-content-container">
                        <h2>Latest conversations:</h2>
                        <ConversationList mode='all' limit={6}/>
                        <button
                            type="button"
                            onClick={() => redirect('/admin/conversations')}
                        >
                            Conversation Control Panel
                        </button>
                    </div>
                </section>
                <section className="outer-content-container">
                    <div className="inner-content-container">
                        <h2>Known genres:</h2>
                        <GenreList mode='all' limit={6}/>
                        <button
                            type="button"
                            onClick={() => redirect('/admin/genres')}
                        >
                            Genre Control Panel
                        </button>
                    </div>
                </section>

            </main>
            <Footer/>
        </>

    );
}

export default AdminControlPanel;