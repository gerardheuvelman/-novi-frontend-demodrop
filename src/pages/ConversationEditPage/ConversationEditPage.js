import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import {useParams} from "react-router-dom";
import ConversationForm from "../../components/ConversationForm/ConversationForm";
import styles from './ConversationEditPage.module.css';
import Footer from "../../components/Footer/Footer";
import {GetRequest} from "../../helpers/axiosHelper";

function ConversationEditPage() {
    const {conversationId} = useParams();
    console.log('conversationId from params: ', conversationId);
    const [conversation, setConversation] = useState(null);

    useEffect(() => {
        async function fetchConversation() {
            const response = await new GetRequest(`/conversations/${conversationId}`).invoke();
            prepareConversation(response.data);
            setConversation(response.data);
        }
        void fetchConversation();
    }, []); // EXECUTE ON MOUNT

    function prepareConversation(conversation) {
        console.log('conversation to be prepared for display: ' , conversation);

        // add "Re:" to the message subject
        let msgSubject = conversation.subject;
        const desiredSubjectPrefix = 'Re: ';
        const foundSubjectPrefix = msgSubject.substring(0,4);
        console.log(`Prefix found in original message subject: "${foundSubjectPrefix}"`);

        if ( foundSubjectPrefix !== desiredSubjectPrefix) {
            msgSubject = desiredSubjectPrefix + msgSubject;
            conversation.subject = msgSubject;
        }

        // next jeb: indent body with "| " :
        const msgBody = conversation.body;
        console.log('original message body:\n', msgBody);
        const linePrefix = '|> ';
        // first, split te body into an array of lines
        const lines = msgBody.split('\n');
        console.log('lines array just after splitting: ',lines);
        // indent each line separately:
        const prefixedLines = lines.map(line => linePrefix + line);
        // add two blank lines to the beginning of the lines array.
        prefixedLines.unshift("","");
        console.log('prefixedLines after ushifting: ', prefixedLines);
        // now, convert array back to a single string and assign it back to the message body:
        conversation.body = prefixedLines.join('\n');

        // finally , return the conversation.
        return conversation;
    }

    function indentLine (line, prefix) {
        return prefix + line;
    }


    return (
        <>
            <Header>
                <h1>Reply to a received message</h1>
            </Header>
            <main>
                {console.log('conversation to be given to component "conversationform": ', conversation)}
                {conversation && <ConversationForm mode='update' prefillConversation={conversation}/>}
            </main>
            <Footer/>
        </>
    );
}

export default ConversationEditPage;