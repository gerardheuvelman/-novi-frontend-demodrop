import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import Header from '../../../components/otherComponents/structuralComponents/Header/Header';
import {AuthContext} from "../../../context/AuthContext";
import ConversationDetails from "../../../components/detailComponents/ConversationDetails/ConversationDetails";
import styles from './ConversationDetailsPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {GetRequest} from "../../../helpers/axiosHelper";

function ConversationDetailsPage({mode}) {
    const [conversation, setConversation] = useState({});
    const {conversationId} = useParams();

    useEffect(() => {
        async function fetchConversation() {
            const response = await new GetRequest(`/conversations/${conversationId}`).invoke();
            setConversation(response.data);
        }
        void fetchConversation();
    }, []);

    return (
        <>
            <Header>
                <h1>Conversation Details </h1>
                <h4>{`...for conversation ${conversationId}`}</h4>
                {/*{ Object.keys(conversation).length > 0 && <h4>a conversation between {conversation.producer} (producer of {conversation.demo.title}) and {conversation.interestedUser.username} (interested party)</h4>}*/}
            </Header>
            <main>
                {conversation ? <ConversationDetails conversation={conversation} mode={mode}/> : <p>Loading...</p>}
                <p><Link onClick={() => window.history.back()} to="#">{` <<Back`}</Link></p>
            </main>
            <Footer/>
        </>
    );
}

export default ConversationDetailsPage;