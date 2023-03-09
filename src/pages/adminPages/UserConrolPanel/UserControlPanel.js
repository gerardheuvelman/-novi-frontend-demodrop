import React, {useContext, useState} from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import logo from "../../../assets/DemoDropLogo.png";
import {Link, redirect} from "react-router-dom";
import {AuthContext} from '../../../context/AuthContext';
import UserList from "../../../components/listComponents/UserList/UserList";
import DemoList from "../../../components/listComponents/DemoList/DemoList";
import ConversationList from "../../../components/listComponents/ConversationList/ConversationList";
import styles from './UserControlPanel.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import GenreList from "../../../components/listComponents/GenreList/GenreList";
import {useNavigate} from "react-router-dom";
import AudioFileList from "../../../components/listComponents/AudioFileList/AudioFileList";

function UserControlPanel({mode}) {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const {user} = useContext(AuthContext);
    console.log('User object:', user);

    return (
        <>
            <Header>
                <h1>User Control panel (admin mode)</h1>
                <h2>Welcome, {user.username} </h2>
            </Header>
            <main>
                <section>
                    <p><Link to={'/admin/newuser'}>Create new user</Link></p>
                    <p><Link to={'/admin/newadmin'}>Create new admin user</Link></p>
                </section>
                <UserList mode={mode} ></UserList>
            </main>
            <Footer/>
        </>

    );
}

export default UserControlPanel;