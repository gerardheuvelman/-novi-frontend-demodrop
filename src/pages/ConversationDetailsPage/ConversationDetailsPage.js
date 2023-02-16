import React, {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';
import {AuthContext} from "../../context/AuthContext";
import ConversationDetails from "../../components/ConversationDetails/ConversationDetails";
import styles from './ConversationDetailsPage.module.scss';
import Footer from "../../components/Footer/Footer";

function ConversationDetailsPage() {
  const [conversation, setConversation] = useState({});
  const { conversationId } = useParams();
  const {context} = useContext(AuthContext);
  console.log(context);

  useEffect(() => { // TODO moderniseren!!
    const storedToken = localStorage.getItem("token");
    async function fetchConversation() {
      try {
        const response = await axios.get(`http://localhost:8080/conversations/${conversationId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          }
        });
        console.log(response.data);
        setConversation(response.data);
      } catch (e) {
        console.error(e);
      }
    }
      void fetchConversation();
  }, []);

  return (
    <>
      <Header>
        <h1>Conversation id: {conversationId}</h1>
        {/*{ Object.keys(conversation).length > 0 && <h4>a conversation between {conversation.producer} (producer of {conversation.demo.title}) and {conversation.interestedUser.username} (interested party)</h4>}*/}
      </Header>
      <main>
        conversation ? <ConversationDetails conversation={conversation}/> : <p>Loading...</p>
      </main>
      <Footer/>
    </>
  );
}

export default ConversationDetailsPage;