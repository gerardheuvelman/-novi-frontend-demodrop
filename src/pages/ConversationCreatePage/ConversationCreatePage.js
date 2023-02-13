import React, {useEffect, useState} from 'react';
import './ConversationCreatePage.css';
import Header from "../../components/Header/Header";
import {useParams} from "react-router-dom";
import ConversationForm from "../../components/ConversationForm/ConversationForm";
import styles from './ConversationCreatePage.module.scss';

function ConversationCreatePage() {

    const blankConversation = {
        subject: "",
        body: "",
    };

    return (
        <>
            <Header>
                <h1>Inquire about a demo</h1>
            </Header>
            <main>
                <ConversationForm mode='create' prefillConversation={blankConversation}/>
            </main>
        </>
    );
}

export default ConversationCreatePage;