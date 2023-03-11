import React, {useContext} from 'react';
import {Link, useParams} from 'react-router-dom';
import {AuthContext} from "../../../context/AuthContext";
import styles from './ConversationDetails.module.css';

function ConversationDetails({conversation, mode}) { // modes: 'owner' or 'admin'
    const {conversationId} = useParams();
    const {user} = useContext(AuthContext);
    console.log('Mode for ConversationDetails: ', mode)

    return (
        <>
            <section className="outer-content-container demo-specifications">
                <div className="inner-content-container">
                    {conversation && (
                        <div className="demo-specification-details">
                            <h3>Latest update date</h3>
                            <p>{conversation.latestReplyDate}</p>
                            <h3>Subject</h3>
                            <input disabled={true} value={conversation.subject}></input>
                            <h3>Body</h3>
                            <textarea rows={10} cols={100} disabled={true} value={conversation.body}/>
                            {mode === 'owner' &&
                                <p>
                                    <Link to={`/conversations/${conversationId}/reply`}>Reply</Link>
                                    <br/>
                                    <Link to={`/users/${user.username}/conversations`}>{`<<Back to Inbox`}</Link>
                                </p>}
                        </div>
                    )}
                </div>
            </section>
            {mode === 'admin' && <section>
                <td><Link to={`/admin/conversations/${conversation.conversationId}/edit`}>Edit this conversation</Link></td>
                <Link to={`/admin/users/${user.username}/conversations`}>All conversations fir this user</Link>
            </section>}
        </>
    );
}

export default ConversationDetails;