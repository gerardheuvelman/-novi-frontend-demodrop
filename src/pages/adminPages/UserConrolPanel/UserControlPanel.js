import React, {useContext, useState} from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import {Link, redirect} from "react-router-dom";
import {AuthContext} from '../../../context/AuthContext';
import UserList from "../../../components/listComponents/UserList/UserList";
import styles from './UserControlPanel.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import MainComponent from "../../../components/otherComponents/structuralComponents/MainComponent/MainComponent";

function UserControlPanel({mode}) { // mode: 'admin'

    const {user} = useContext(AuthContext);
    console.log('User object:', user);

    return (
        <>
            <Header>
                <h3>User control panel</h3>
                <h4>Welcome, {user.username} </h4>
            </Header>
            <MainComponent>
                <section className='panel-controls'>
                    <h3>Available actions</h3>
                    <Link to={'/admin/users/createuser'}>Create new user</Link>
                    <Link to={'/admin/users/createadmin'}>Create new admin user</Link>
                </section>
                <UserList mode={mode} limit={0} ></UserList>
            </MainComponent>
            <Footer/>
        </>

    );
}

export default UserControlPanel;