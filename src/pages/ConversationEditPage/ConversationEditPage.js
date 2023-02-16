import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from "../../components/Header/Header";
import { useParams} from "react-router-dom";
import ConversationForm from "../../components/ConversationForm/ConversationForm";
import styles from './ConversationEditPage.module.scss';
import Footer from "../../components/Footer/Footer";

function ConversationEditPage() {
    const {conversationId} = useParams();
    console.log(conversationId);
    const [conversation, setConversation] = useState({});
    const storedToken = localStorage.getItem("token");

    useEffect(() => { // TODO: Moderniseren
        async function fetchConversation() {
            try {
                const response = await axios.get(`http://localhost:8080/conversations/${conversationId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${storedToken}`,
                    }
                });
                console.log('await axios.get(`http://localhost:8080/conversations/${id}) yields the following response`', response);
                setConversation(response.data);
            } catch (e) {
                console.error(e);
            }
        }
        void fetchConversation();
    }, []);

    return (
        <>
            <Header>
                <h1>Reply to a received message</h1>
            </Header>
            <main>
                {console.log(conversation)}
                <ConversationForm mode='update' prefillConversation={conversation}/>
            </main>
            <Footer/>
        </>
    );
}

export default ConversationEditPage;