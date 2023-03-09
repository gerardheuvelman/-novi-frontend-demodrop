import React, {useContext, useEffect, useState} from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import authContext, {AuthContext} from "../../../context/AuthContext";
import ConversationList from "../../../components/listComponents/ConversationList/ConversationList";
import styles from './ConversationListPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {Link} from "react-router-dom";

function ConversationListPage({mode, limit}) { // mode: 'personal' or 'admin'
    const {user} = useContext(AuthContext);
    console.log(mode);

    return (
        <>
            <Header>
                {mode === 'personal' && <h1>Conversation list</h1>}
                {mode === 'admin' && <h1>Conversation list (admin mode)</h1>}
                {mode === 'personal' && <h4>a list of all of {user.username}'s conversations</h4>}
                {mode === 'admin' && <h4>a list of all conversations</h4>}
            </Header>
            <main>
                <div className="page-container">
                    <ConversationList mode={mode} limit={limit}></ConversationList>
                </div>
                <p><Link onClick={() => window.history.back()} to="#">{` <<Back`}</Link></p>
            </main>
            <Footer/>
        </>
    );
}

export default ConversationListPage;