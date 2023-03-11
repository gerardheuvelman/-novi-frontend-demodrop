import React, {useContext, useState} from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import {Link, redirect} from "react-router-dom";
import {AuthContext} from '../../../context/AuthContext';
import styles from './ConversationControlPanel.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import DemoList from "../../../components/listComponents/DemoList/DemoList";
import ConversationList from "../../../components/listComponents/ConversationList/ConversationList";

function ConversationControlPanel({mode}) { // mode: 'admin'

    const {user} = useContext(AuthContext);
    console.log('User object:', user);

    return (
        <>
            <Header>
                <h1>Conversation control panel</h1>
                <h2>Welcome, {user.username} </h2>
            </Header>
            <main>
                <section>
                </section>
                <ConversationList mode={mode} limit={0} ></ConversationList>
            </main>
            <Footer/>
        </>

    );
}

export default ConversationControlPanel;