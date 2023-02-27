import React, {useContext, useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import authContext, {AuthContext} from "../../context/AuthContext";
import ConversationList from "../../components/ConversationList/ConversationList";
import styles from './ConversationListPage.module.css';
import Footer from "../../components/Footer/Footer";

function ConversationListPage({mode, limit}) { // mode: 'personal' or 'admin'
    const {user} = useContext(AuthContext);
    console.log(mode);

    return (
        <>
            <Header>
                <h1>Conversation list</h1>
                {mode === 'personal' && <h4>a list of all of {user.username}'s conversations</h4>}
                {mode === 'admin' && <h4>a list of all conversations</h4>}
            </Header>
            <main>
                <div className="page-container">
                    <ConversationList mode={mode} limit={limit}></ConversationList>
                </div>
            </main>
            <Footer/>
        </>
    );
}

export default ConversationListPage;