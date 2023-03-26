import React, {useContext, useState} from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import {Link, redirect} from "react-router-dom";
import {AuthContext} from '../../../context/AuthContext';
import styles from './ConversationControlPanel.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import DemoList from "../../../components/listComponents/DemoList/DemoList";
import ConversationList from "../../../components/listComponents/ConversationList/ConversationList";
import MainComponent from "../../../components/otherComponents/structuralComponents/MainComponent/MainComponent";

function ConversationControlPanel({mode}) { // mode: 'admin'

    const {user} = useContext(AuthContext);
    console.log('User object:', user);

    return (
        <>
            <Header>
                <h3>Conversation control panel</h3>
                <h4>Welcome, {user.username} </h4>
            </Header>
            <MainComponent>
                <section className='panel-controls'>
                    <h3>Available actions</h3>
                <p>To create a new conversation in admin mode, see <Link to={'/admin/demos'}>Demo Control Panel</Link> </p>
                </section>
                <ConversationList mode={mode} limit={0} ></ConversationList>
            </MainComponent>
            <Footer/>
        </>

    );
}

export default ConversationControlPanel;