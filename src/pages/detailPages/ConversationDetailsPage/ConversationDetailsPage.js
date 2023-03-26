import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import Header from '../../../components/otherComponents/structuralComponents/Header/Header';
import ConversationDetails from "../../../components/detailComponents/ConversationDetails/ConversationDetails";
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {GetRequest} from "../../../helpers/axiosHelper";
import MainComponent from "../../../components/otherComponents/structuralComponents/MainComponent/MainComponent";

function ConversationDetailsPage({mode}) { // Modes: 'owner' or 'admin'
    const [conversation, setConversation] = useState(null);
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
            {conversation &&
                <>
                    <Header>
                        {mode === 'owner' && <h3>Message details </h3>}
                        {mode === 'admin' && <h3>Conversation details </h3>}
                        {mode === 'owner' && <h4>{`...for message with subject "${conversation.subject}"`}</h4>}
                        {mode === 'admin' && <h4>{`...for conversation "${conversationId}"`}</h4>}
                    </Header>
                    <MainComponent>
                        {conversation ? <ConversationDetails conversation={conversation} mode={mode}/> :
                            <p>Loading...</p>}
                    </MainComponent>
                    <Footer/>
                </>}
        </>
    );
}

export default ConversationDetailsPage;