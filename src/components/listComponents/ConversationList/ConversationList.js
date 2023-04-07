import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../../context/AuthContext";
import {Link} from "react-router-dom";
import styles from './ConversationList.module.css';
import {GetRequest} from "../../../helpers/axiosHelper";
import {DateTime} from "../../../helpers/dateTimeHelper";
import SmartTable from "../../otherComponents/SmartTable/SmartTable";

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
            <SmartTable>
                <thead>
                <tr>
                    <th className='priority-5'>Date</th>
                    <th className='priority-9'>Time</th>
                    {mode === 'owner' && <th className='priority-8'>User</th>}
                    {mode === 'admin' && <th className='priority-8'>Correspondent</th>}
                    {mode === 'admin' && <th className='priority-8'>Initiator</th>}
                    {mode === 'admin' && <th className='priority-7'>Demo Id</th>}
                    <th className='priority-9'>Demo title</th>
                    <th className='priority-4'>Subject</th>
                    {<th className='priority-1'>View</th>}
                    {mode === 'admin' && <th className='priority-10'>Edit</th>}
                </tr>
                </thead>
                <tbody>
                {conversations.map((conversation) => {
                    const dateTimeCreated = new DateTime(conversation.createdDate);

                    // De key moet op het buitenste element staan en uniek zijn
                    return <tr key={conversation.conversationId}>
                        <td className='priority-5'>{dateTimeCreated.getDateString()}</td>
                        <td className='priority-9'>{dateTimeCreated.getTimeString()}</td>
                        { conversation.correspondent ?
                            <>
                                {mode === 'owner' && <td className='priority-8'><Link to={`/users/${user.username ===  conversation.correspondent.username ? conversation.initiator.username: conversation.correspondent.username }/profile`}>{user.username ===  conversation.correspondent.username ? conversation.initiator.username: conversation.correspondent.username }</Link></td>}
                                {mode === 'admin' && <td className='priority-8'><Link to={`/admin/users/${conversation.correspondent.username}`}>{conversation.correspondent.username}</Link></td>}
                            </>
                            :  <td className='priority-8'>-</td>
                        }
                        { conversation.initiator ?
                            <>
                                {mode === 'admin' && <td className='priority-8'><Link to={`/admin/users/${conversation.initiator.username}`}>{conversation.initiator.username}</Link></td>}
                                {mode === 'admin' &&
                                    <>
                                        {conversation.demo ? <td className='priority-7'><Link to={`/admin/demos/${conversation.demo.demoId}`}>{conversation.demo.demoId}</Link></td> : <td>-</td>}
                                    </>
                                }
                            </> : <td className='priority-8'>-</td>
                        }
                        {conversation.demo ? <td className='priority-9'>{conversation.demo.title}</td> : <td>-</td>}
                        {mode !== 'admin' && <td className='priority-4'><Link to={`/conversations/${conversation.conversationId}`}>{conversation.subject}</Link></td>}
                        {mode === 'admin' && <td className='priority-4'>{conversation.subject}</td>}
                        {mode === 'owner' && <td className='priority-1'><Link to={`/conversations/${conversation.conversationId}`}>View</Link></td>}
                        {mode === 'admin' && <td className='priority-1'><Link to={`/admin/conversations/${conversation.conversationId}`}>View</Link></td>}
                        {mode === 'admin' && <td className='priority-10'><Link to={`/admin/conversations/${conversation.conversationId}/edit`}>Edit</Link></td>}
                    </tr>
                })}
                {conversations.length === 0 && <p>There are no conversations that match your search criteria...</p>}
                </tbody>
            </SmartTable>
        </>
    );
}

export default ConversationList;