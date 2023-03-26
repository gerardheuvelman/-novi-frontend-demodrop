import React, {useContext, useState} from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import {Link, redirect} from "react-router-dom";
import {AuthContext} from '../../../context/AuthContext';
import UserList from "../../../components/listComponents/UserList/UserList";
import styles from './GenreControlPanel.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import GenreList from "../../../components/listComponents/GenreList/GenreList";
import MainComponent from "../../../components/otherComponents/structuralComponents/MainComponent/MainComponent";

function GenreControlPanel({mode}) { // mode: 'admin'

    const {user} = useContext(AuthContext);
    console.log('User object:', user);

    return (
        <>
            <Header>
                <h3>Genre control panel</h3>
                <h4>Welcome, {user.username} </h4>
            </Header>
            <MainComponent>
                <section className='panel-controls'>
                    <h3>Available actions</h3>
                    <Link to={'/admin/genres/create'}>New music genre </Link>
                </section>
                <GenreList mode={mode} limit={0} ></GenreList>
            </MainComponent>
            <Footer/>
        </>

    );
}

export default GenreControlPanel;