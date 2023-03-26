import React, {useContext, useEffect, useState} from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import authContext, {AuthContext} from "../../../context/AuthContext";
import ConversationList from "../../../components/listComponents/ConversationList/ConversationList";
import styles from './ConversationListPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {Link} from "react-router-dom";
import MainComponent from "../../../components/otherComponents/structuralComponents/MainComponent/MainComponent";

function ConversationListPage({mode}) { // mode: 'owner' or 'admin'
    const {user} = useContext(AuthContext);
    console.log('Mode of ConversationListPage: ', mode);

    return (
        <>
            <Header>
                {mode === 'owner' && <h3>My messages</h3>}
                {mode === 'admin' && <h3>Conversation list (admin mode)</h3>}
                {mode === 'owner' && <h4>a list of all of {user.username}'s conversations</h4>}
                {mode === 'admin' && <h4>a list of all conversations</h4>}
            </Header>
            <MainComponent>
                    <ConversationList mode={mode} limit={0}></ConversationList>
            </MainComponent>
            <Footer/>
        </>
    );
}

export default ConversationListPage;