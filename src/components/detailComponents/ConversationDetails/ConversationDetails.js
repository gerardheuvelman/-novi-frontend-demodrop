import React, {useContext} from 'react';
import {Link, useParams} from 'react-router-dom';
import {AuthContext} from "../../../context/AuthContext";
import styles from './ConversationDetails.module.css';
import {DateTime} from "../../../helpers/dateTimeHelper";

function ConversationDetails({conversation, mode}) { // modes: 'owner' or 'admin'
    const {conversationId} = useParams();
    const {user} = useContext(AuthContext);
    console.log('conversation in ConversationDetails: ', conversation);
    const dateTimeLastUpdate = new DateTime(conversation.latestReplyDate);
    const lastUpdateDate = dateTimeLastUpdate.getDateString();
    const lastUpdateTime = dateTimeLastUpdate.getTimeString();
    console.log('Mode for ConversationDetails: ', mode)

    return (
        <>
            {conversation &&
                <section className='details-section'>
                    <article className='details-info'>
                        <h3>Last updated</h3>
                        <span>
                              {lastUpdateDate}  {lastUpdateTime}
                        </span>
                        <h3>Subject</h3>
                        <input disabled={true} value={conversation.subject}></input>
                        <h3>Body</h3>
                        <textarea rows={10} cols={100} disabled={true} value={conversation.body}/>
                    </article>
                    <article className='details-controls'>
                        {mode === 'owner' &&
                            <>
                                <Link to={`/conversations/${conversationId}/reply`}>Reply</Link>
                                <Link to={`/users/${user.username}/conversations`}>{`<<Back to Inbox`}</Link>
                            </>}
                        {mode === 'admin' &&
                            <>
                                <Link to={`/admin/conversations/${conversation.conversationId}/edit`}>Edit this
                                    conversation</Link>
                                <Link to={`/users/${user.username}/myconversations`}>All conversations for this
                                    user</Link>
                            </>}
                    </article>
                </section>}
        </>
    );
}

export default ConversationDetails;