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
import {useNavigate} from "react-router-dom";
import AudioFileList from "../../components/AudioFileList/AudioFileList";

function AdminControlPanel(props) {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const {user} = useContext(AuthContext);
    console.log('User object:', user);

    function redirectToUSerControlPanel() {
        navigate('/admin/users');
    }

    function redirectToDemoControlPanel() {
        navigate('/admin/demos');
    }

    function redirectToConversationControlPanel() {
        navigate('/admin/conversations');
    }

    function redirectToGenreControlPanel() {
        navigate('/admin/genres');
    }

    function redirectToAudioFileControlPanel() {
        navigate('/admin/audiofiles');
    }

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
                        <UserList mode='admin' limit={6} />
                        <button type="button" onClick= {redirectToUSerControlPanel}>
                            User Control Panel
                        </button>
                    </div>
                </section>
                <section className="outer-content-container">
                    <div className="inner-content-container">
                        <h2>Latest demos:</h2>
                        <DemoList mode='admin' limit={6}/>
                        <button type="button" onClick= {redirectToDemoControlPanel}>
                            Demo Control Panel
                        </button>
                    </div>
                </section>
                <section className="outer-content-container">
                    <div className="inner-content-container">
                        <h2>Latest conversations:</h2>
                        <ConversationList mode='admin' limit={6}/>
                        <button type="button" onClick= {redirectToConversationControlPanel}>
                            Conversation Control Panel
                        </button>
                    </div>
                </section>
                <section className="outer-content-container">
                    <div className="inner-content-container">
                        <h2>Latest audio files:</h2>
                        <AudioFileList mode='admin' limit={6}/>
                        <button type="button" onClick= {redirectToAudioFileControlPanel}>
                            File Control Panel
                        </button>
                    </div>
                </section>
                <section className="outer-content-container">
                    <div className="inner-content-container">
                        <h2>Known genres:</h2>
                        <GenreList mode='admin' limit={6}/>
                        <button type="button" onClick= {redirectToGenreControlPanel}>
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