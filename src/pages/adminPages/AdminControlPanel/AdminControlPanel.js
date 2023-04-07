import React, {useContext, useState} from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import logo from "../../../assets/DemoDropLogo.png";
import {Link, redirect} from "react-router-dom";
import {AuthContext} from '../../../context/AuthContext';
import UserList from "../../../components/listComponents/UserList/UserList";
import DemoList from "../../../components/listComponents/DemoList/DemoList";
import ConversationList from "../../../components/listComponents/ConversationList/ConversationList";
import styles from './AdminControlPanel.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import GenreList from "../../../components/listComponents/GenreList/GenreList";
import {useNavigate} from "react-router-dom";
import AudioFileList from "../../../components/listComponents/AudioFileList/AudioFileList";
import MainComponent from "../../../components/otherComponents/structuralComponents/MainComponent/MainComponent";
import Button from "../../../components/otherComponents/buttons/Button/Button";
import UserReportList from "../../../components/listComponents/UserReportList/UserReportList";

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

    function redirectToUserReportControlPanel() {
        navigate('/admin/userreports');
    }

    return (
        <>
            <Header>
                <h3>Admin Control panel</h3>
                <h4>Welcome, {user.username} </h4>
            </Header>
            <MainComponent>
                <section className="outer-content-container">
                    <div className="inner-content-container">
                        <div className='list-backdrop'>
                            {/*<h3>Latest users:</h3>*/}
                            {/*<UserList mode='admin' limit={6}/>*/}
                            <Button color='white' type="button" onClick={redirectToUSerControlPanel}>
                                User Control Panel
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="outer-content-container">
                    <div className="inner-content-container">
                        <div className='list-backdrop'>
                            {/*<h3>Latest demos:</h3>*/}
                            {/*<DemoList mode='admin' limit={6}/>*/}
                            <Button color='white' type="button" onClick={redirectToDemoControlPanel}>
                                Demo Control Panel
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="outer-content-container">
                    <div className="inner-content-container">
                        <div className='list-backdrop'>
                            {/*<h3>Latest conversations:</h3>*/}
                            {/*<ConversationList mode='admin' limit={6}/>*/}
                            <Button color='white' type="button" onClick={redirectToConversationControlPanel}>
                                Conversation Control Panel
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="outer-content-container">
                    <div className="inner-content-container">
                        <div className='list-backdrop'>
                            {/*<h3>Latest audio files:</h3>*/}
                            {/*<AudioFileList mode='admin' limit={6}/>*/}
                            <Button color='white' type="button" onClick={redirectToAudioFileControlPanel}>
                                File Control Panel
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="outer-content-container">
                    <div className="inner-content-container">
                        <div className='list-backdrop'>
                            {/*<h3>Latest user reports:</h3>*/}
                            {/*<UserReportList mode='admin' limit={6}/>*/}
                            <Button color='white' type="button" onClick={redirectToUserReportControlPanel}>
                                User Report Control Panel
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="outer-content-container">
                    <div className="inner-content-container">
                        <div className='list-backdrop'>
                            {/*<h3>Music genres:</h3>*/}
                            {/*<GenreList mode='admin' limit={6}/>*/}
                            <Button color='white' type="button" onClick={redirectToGenreControlPanel}>
                                Genre Control Panel
                            </Button>
                        </div>
                    </div>
                </section>
            </MainComponent>
            <Footer/>
        </>
    );
}

export default AdminControlPanel;