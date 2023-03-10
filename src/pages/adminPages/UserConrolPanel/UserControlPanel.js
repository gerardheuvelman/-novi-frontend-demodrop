import React, {useContext, useState} from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import {Link, redirect} from "react-router-dom";
import {AuthContext} from '../../../context/AuthContext';
import UserList from "../../../components/listComponents/UserList/UserList";
import styles from './UserControlPanel.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";

function UserControlPanel({mode}) { // mode: 'admin'

    const {user} = useContext(AuthContext);
    console.log('User object:', user);

    return (
        <>
            <Header>
                <h1>User control panel</h1>
                <h2>Welcome, {user.username} </h2>
            </Header>
            <main>
                <section>
                    <p><Link to={'/admin/users/createuser'}>Create new user</Link></p>
                    <p><Link to={'/admin/users/createadmin'}>Create new admin user</Link></p>
                </section>
                <UserList mode={mode} limit={0} ></UserList>
            </main>
            <Footer/>
        </>

    );
}

export default UserControlPanel;