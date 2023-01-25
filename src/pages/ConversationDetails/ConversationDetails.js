import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './ConversationDetails.css';
import Header from '../../components/header/Header';
import { ReactComponent as BackIcon } from '../../assets/back.svg';
import authContext from "../../context/AuthContext";

function ConversationDetails() {
  const [conversation, setConversation] = useState({});
  const { id } = useParams();

  useEffect(() => { // TODO moderniseren!!
    async function fetchConversation() {
      try {
        const response = await axios.get(`http://localhost:8080/conversations/${id}`);
        console.log(response);
        setConversation(response);
      } catch (e) {
        console.error(e);
      }
    }
    if (id) {
      void fetchConversation();
    }
  }, [id]); // LET OP: MOET DIT NIET OP MOUNT IPV UPDATE?

  return (
    <>
      <Header>
        <h1>Conversation id: {id}</h1>
        <h4>a conversation between {authContext.username} (producer of {conversation.username} )and {conversation.interestedUserUsername} (interested party)</h4>
      </Header>
      <main>
        <section className="outer-content-container demo-specifications">
          <div className="inner-content-container">
            {Object.keys(conversation).length > 0 && (
              <div className="demo-specification-details">
                <h3>Latest update date</h3>
                <p>{conversation.latestReplyDate}</p>
                <h3>Subject</h3>
                <p>{conversation.subject}</p>
                <h3>Body</h3>
                <p>{conversation.body}</p>
                <span className="back-link-wrapper">
                  <BackIcon className="back-icon"/>
                  <Link to={`/users/${authContext.username}/conversations`}>Back to INBOX</Link>
                </span>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default ConversationDetails;