import React, {useEffect, useState} from 'react';
import axios from "axios";
import './ConversationList.css';
import Header from "../../components/header/Header";
import authContext from "../../context/AuthContext";

function ConversationList(props) {
    const [conversations, setConversations] = useState([]);

    useEffect(() => { // TODO: Moderniseren
        async function fetchConversations() {
            try {
                const response = await axios.get(`http://localhost:8080/users/${authContext.username}/conversations`);
                // Plaats alle conversations in de state zodat we het op de pagina kunnen gebruiken
                console.log(response); // LET OP: GEEF IK OOK EEN DATA OBJECT TERUG IN DE BACK-END? (volgens mij niet)
                setConversations(response);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchConversations();
    }, []);

    return (
        <>
            <Header>
                <h1>INBOX</h1>
                <h4>a list of all your conversations</h4>
            </Header>
            <main>
                <div className="page-container">
                    <h1>INBOX</h1>
                    <table>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>User</th>
                            <th>Demo</th>
                            <th>Subject</th>
                        </tr>
                        </thead>
                        <tbody>
                        {conversations.map((conversation) => {
                            // De key moet op het buitenste element staan en uniek zijn
                            return <tr key={conversation.id}>
                                <td>{conversation.latestReplyDate}</td>
                                <td>{conversation.interestedUsername}</td>
                                <td>{conversation.demoTitle}</td>
                                <td>{conversation.subject}</td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
}

export default ConversationList;