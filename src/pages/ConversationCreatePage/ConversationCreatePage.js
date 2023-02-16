import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import {useParams} from "react-router-dom";
import ConversationForm from "../../components/ConversationForm/ConversationForm";
import styles from './ConversationCreatePage.module.scss';
import Footer from "../../components/Footer/Footer";
import CommonPageComponent from "../../components/CommonPageComponent/CommonPageComponent";
import CommonFormComponent from "../../components/CommonFormComponent/CommonFormComponent";

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
            <Footer/>
        </>
    );
}

export default ConversationCreatePage;