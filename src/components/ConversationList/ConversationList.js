import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import './ConversationList.css';
import {AuthContext} from "../../context/AuthContext";
import {Link} from "react-router-dom";
import styles from './ConversationList.module.scss';

function ConversationList({mode, limit}) {
    const [conversations, setConversations] = useState([]);
    const {user} = useContext(AuthContext);
    console.log(mode);

    useEffect(() => { // TODO: Moderniseren
        const storedToken = localStorage.getItem("token");

        async function fetchConversations() {
            try {
                let response = '';
                if (mode === 'personal') {
                    response = await axios.get(`http://localhost:8080/users/${user.username}/conversations?limit=${limit}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${storedToken}`,
                        }
                        // , signal: controller.signal
                    });

                } else if (mode = 'all') {
                    response = await axios.get(`http://localhost:8080/conversations?limit=${limit}`,{
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${storedToken}`,
                        }
                        // , signal: controller.signal
                    });
                }
                console.log(response.data);
                setConversations(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchConversations();
    }, []);

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    {mode === 'personal' && <th>User</th>}
                    {mode === 'all' && <th>Producer</th>}
                    {mode === 'all' && <th>Interested User</th>}
                    <th>Demo</th>
                    <th>Subject</th>
                </tr>
                </thead>
                <tbody>
                {conversations.map((conversation) => {
                    // De key moet op het buitenste element staan en uniek zijn
                    return <tr key={conversation.conversationId}>
                        <td>{conversation.latestReplyDate}</td>
                        {mode === 'personal' && <td>{conversation.interestedUser.username}</td>}
                        {mode === 'all' && <td>{conversation.producer.username}</td>}
                        {mode === 'all' && <td>{conversation.interestedUser.username}</td>}
                        <td>{conversation.demo.title}</td>
                        <td><Link to={`/conversations/${conversation.conversationId}`}>{conversation.subject}</Link>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </>
    );
}

export default ConversationList;