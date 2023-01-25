import React, {useEffect, useState} from 'react';
import './ConversationForm.css';
import axios from 'axios';
import Header from "../../components/header/Header";
import {useParams} from "react-router-dom";
import authContext from "../../context/AuthContext";

function ConversationForm(mode) { // LET OP id moet meeggeven worden als parameter of volgt dat logisch uit de gekozen route?
    const { id } = useParams();
    const [genres, setGenres] = useState([]);
    const [conversation, setConversation] = useState({});
    const [createSuccess, toggleCreateSuccess] = useState(false);
    const [updateSuccess, toggleUpdateSuccess] = useState(false);
    // Conversation details
    const [conversationCreatedDate, setConversationCreatedDate] = useState(conversation? conversation.createdDate : '');  // of moet dit null zijn???
    const [conversationSubject, setConversationSubject] = useState(conversation ? conversation.subject : '');
    const [conversationBody, setConversationBody] = useState(conversation ? conversation.body : '');

    useEffect(() => { // TODO: Moderniseren
        async function fetchConversation() {
            try {
                const response = await axios.get(`http://localhost:8080/conversations/${id}`);
                // Plaats de conversation in de state zodat we het op de pagina kunnen gebruiken
                console.log(response); // LET OP: GEEF IK OOK EEN DATA OBJECT TERUG IN DE BACK-END? (volgens mij niet)
                setConversation(response);
            } catch (e) {
                console.error(e);
            }
        }
        if (mode === 'update') {
            void fetchConversation();
        }
    }, []);

    async function createOrUpdateDemo(e, id) {
        // prevent refresh
        e.preventDefault();
        // maak een nieuw FormData object (ingebouwd type van JavaScript)
        console.log(conversationCreatedDate, conversationSubject, conversationBody);
        if (mode === 'create') {
            await createConversation(e);
        } else if (mode === 'update') {
            await updateConversation(e);
        }
    }

    async function createConversation(e) {
        try {
            // Verstuur de data in een object en zorg dat de keys overeenkomen met die in de backend
            const response = await axios.post('http://localhost:8080/conversations', {
                subject: conversationSubject,
                body: conversationBody,
            });
            console.log(response);
            toggleCreateSuccess(true);
        } catch (e) {
            console.error(e);
        }
    }

    async function updateConversation(e) {
        try {
            // Verstuur de data in een object en zorg dat de keys overeenkomen met die in de backend
            const response = await axios.put(`http://localhost:8080/conversations/${id}`, {
                subject: conversationSubject,
                body: conversationBody,
            });
            console.log(response);
            toggleUpdateSuccess(true);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <Header>
                <h1>Demo reaction form</h1>
                 {mode='create' && <h4> Leave a reaction for {conversation.username}</h4>}
                 {mode='update' && <h4> Rely to {(authContext.username === conversation.username )? conversation.intestedUserUsername : conversation.username}</h4>}
            </Header>
            <main>
                <div className="page-container">
                    {mode === 'create' && <h1>Start a new conversation</h1>}
                    {createSuccess === true && <p>Message has been sent!</p>}
                    {mode === 'update' && <h1>Reply to conversation</h1>}
                    {updateSuccess === true && <p>Your reply has been sent!</p>}
                    <form onSubmit={createOrUpdateDemo}>
                        <label htmlFor="conversation-title">
                            Subject:
                            <input
                                type="text"
                                name="conversation-subject-field"
                                id="conversation-subject"
                                value={conversationSubject}
                                onChange={(e) => setConversationSubject(e.target.value)}/>
                        </label>
                        <label htmlFor="conversation-body`">
                            Body:
                            <textarea
                                name="conversation-body-field"
                                id="conversation-body"
                                value={conversationBody}
                                onChange={(e) => setConversationBody(e.target.value)}>
                            </textarea>
                        </label>
                        <button type="submit" disabled={mode != ('create' || 'update')}>
                            {mode === 'create' && <h1>Create</h1>}
                            {mode === 'update' && <h1>Update</h1>}
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}

export default ConversationForm;