import React, {useContext} from 'react';
import {Link, useParams} from 'react-router-dom';
import {ReactComponent as BackIcon} from '../../assets/back.svg';
import {AuthContext} from "../../context/AuthContext";
import styles from './ConversationDetails.module.css';

function ConversationDetails({conversation}) {
    console.log('conversation: ', conversation);
    const {conversationId} = useParams();
    const {user} = useContext(AuthContext);

    return (
        <>
            <section className="outer-content-container demo-specifications">
                <div className="inner-content-container">
                    {Object.keys(conversation).length > 0 && (
                        <div className="demo-specification-details">
                            <h3>Latest update date</h3>
                            <p>{conversation.latestReplyDate}</p>
                            <h3>Subject</h3>
                            <input disabled={true} value={conversation.subject}></input>
                            <h3>Body</h3>
                            <textarea rows={10} cols={100} disabled={true} value={conversation.body}/>
                            <p><Link to={`/conversations/${conversationId}/reply`}>Reply</Link></p>
                            <span className="back-link-wrapper">
                  <BackIcon className="back-icon"/>
                  <Link to={`/users/${user.username}/conversations`}>Back to INBOX</Link>
                </span>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default ConversationDetails;