import React, {useContext, useState} from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import {Link, redirect} from "react-router-dom";
import {AuthContext} from '../../../context/AuthContext';
import styles from './UserReportControlPanel.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import MainComponent from "../../../components/otherComponents/structuralComponents/MainComponent/MainComponent";
import DeleteButton from "../../../components/otherComponents/buttons/DeleteButton/DeleteButton";
import UserReportList from "../../../components/listComponents/UserReportList/UserReportList";

function UserReportControlPanel({mode}) { // mode: 'admin'

    const {user} = useContext(AuthContext);
    console.log('User object:', user);

    return (
        <>
            <Header>
                <h3>User report control panel</h3>
                <h4>Welcome, {user.username} </h4>
            </Header>
            <MainComponent>
                <section className='panel-controls'>
                    <h3>Available actions</h3>
                    <Link to={'/userreports/create'}>Create new user report</Link>
                    {/*<DeleteButton color='white' mode={mode} entityName='userReport' type='selected'>Delete selected user reports</DeleteButton>*/}
                    <DeleteButton color='white' entityName='userReport' mode={mode}  type='all' >Delete all user reports</DeleteButton>
                </section>
                <UserReportList mode={mode} limit={0} ></UserReportList>
            </MainComponent>
            <Footer/>
        </>

    );
}

export default UserReportControlPanel;