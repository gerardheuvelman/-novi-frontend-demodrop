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
                        <h4>Last updated</h4>
                        <span>
                              {lastUpdateDate}  {lastUpdateTime}
                        </span>
                        <h4>Subject</h4>
                        <input disabled={true} value={conversation.subject}></input>
                        <textarea rows={10} cols={50} disabled={true} value={conversation.body}/>
                    </article>
                    <article className='details-controls'>
                        <h3>Available actions</h3>
                        {mode === 'owner' &&
                            <>
                                <Link to={`/conversations/${conversationId}/reply`}>Reply</Link>
                                {(mode !== 'anon' && mode && mode !== 'admin') &&
                                    <Link to={`/conversations/${conversationId}/report`}>Report this conversation</Link>}
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