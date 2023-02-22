import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from "../../components/Header/Header";
import { useParams} from "react-router-dom";
import ConversationForm from "../../components/ConversationForm/ConversationForm";
import styles from './ConversationEditPage.module.css';
import Footer from "../../components/Footer/Footer";

function ConversationEditPage() {
    const {conversationId} = useParams();
    console.log('conversationId from params: ', conversationId);
    const [existingConversation, setExistingConversation] = useState(null);
    const [demo, setDemo] = useState(null);
    const storedToken = localStorage.getItem("token");

    async function fetchConversation(conversationId) {
        try {
            const response = await axios.get(`http://localhost:8080/conversations/${conversationId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedToken}`,
                }
            });
            console.log(`GET /conversations/${conversationId}) yielded the following response`, response);
            setExistingConversation(response.data);
            return response.data.demo.demoId;
        } catch (e) {
            console.error(e);
        }
    }

    async function fetchDemo(demoId) {
        try {
            const response = await axios.get(`http://localhost:8080/demos/${existingConversation.demo.demoId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedToken}`,
                }
            });
            console.log(`GET /demos/${existingConversation.demo.demoId}) yielded the following response: `, response);
            setDemo(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        async function fetchConversationAndDemoAsync() {
            console.log('First, fetch the conversation from the backend: ');
            const demoId = await fetchConversation(conversationId); // AWAIT IS IMPORTANT HERE!!
            console.log('Next , use the information in the retrieved conversation to retrieve the corresponding demo.');
            await fetchDemo(demoId);
        }
        void fetchConversationAndDemoAsync();
    }, []); // EXECUTE ON MOUNT

    return (
        <>
            <Header>
                <h1>Reply to a received message</h1>
            </Header>
            <main>
                {console.log('conversation to be given to component "conversationform": ', existingConversation)}
                {console.log('demo to be given to component "conversationform": ', demo)}
                {(demo && existingConversation) && <ConversationForm demo={demo} mode='update' prefillConversation={existingConversation}/>}
            </main>
            <Footer/>
        </>
    );
} 

export default ConversationEditPage;