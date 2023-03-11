import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../../context/AuthContext";
import {Link} from "react-router-dom";
import styles from './ConversationList.module.css';
import {GetRequest} from "../../../helpers/axiosHelper";
import {DateTime} from "../../../helpers/dateTimeHelper";

function ConversationList({mode, limit}) { // mode: 'owner' or 'admin'
    const [conversations, setConversations] = useState([]);
    const {user} = useContext(AuthContext);
    console.log('Mode of ConversationList: ', mode);

    useEffect(() => {
        async function fetchConversations() {
                let response = '';
                if (mode === 'owner') {
                    response = await new GetRequest(`/users/${user.username}/conversations`).invoke();
                } else if (mode = 'admin') {
                    response = await new GetRequest(`/conversations?limit=${limit}`).invoke();
                }
                setConversations(response.data)
            }
        void fetchConversations();
    }, []);

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Time</th>
                    {mode === 'owner' && <th>User</th>}
                    {mode === 'admin' && <th>Producer</th>}
                    {mode === 'admin' && <th>Interested User</th>}
                    {mode === 'admin' && <th>Demo Id</th>}
                    <th>Demo title</th>
                    <th>Subject</th>
                    {mode === 'admin' && <th>Edit</th>}
                </tr>
                </thead>
                <tbody>
                {conversations.map((conversation) => {
                    const dateTimeCreated = new DateTime(conversation.createdDate);

                    // De key moet op het buitenste element staan en uniek zijn
                    return <tr key={conversation.conversationId}>
                        <td>{dateTimeCreated.getDateString()}</td>
                        <td>{dateTimeCreated.getTimeString()}</td>
                        {mode === 'owner' && <td><Link to={`/users/${user.username ===  conversation.producer.username ? conversation.interestedUser.username: conversation.producer.username }`}>{user.username ===  conversation.producer.username ? conversation.interestedUser.username: conversation.producer.username }</Link></td>}
                        {mode === 'admin' && <td><Link to={`/admin/users/${conversation.producer.username}`}>{conversation.producer.username}</Link></td>}
                        {mode === 'admin' && <td><Link to={`/admin/users/${conversation.interestedUser.username}`}>{conversation.interestedUser.username}</Link></td>}

                        {mode === 'admin' && <td><Link to={`/admin/demos/${conversation.demo.demoId}`}>{conversation.demo.demoId}</Link></td>}
                        <td>{conversation.demo.title}</td>
                        {mode !== 'admin' && <td><Link to={`/conversations/${conversation.conversationId}`}>{conversation.subject}</Link></td>}
                        {mode === 'admin' && <td>{conversation.subject}</td>}
                        {mode === 'admin' && <td><Link to={`/admin/conversations/${conversation.conversationId}`}>View</Link></td>}
                        {mode === 'admin' && <td><Link to={`/admin/conversations/${conversation.conversationId}/edit`}>Edit</Link></td>}
                    </tr>
                })}
                </tbody>
            </table>
            {conversations.length === 0 && <p>There are no conversations that match your search criteria...</p>}
        </>
    );
}

export default ConversationList;