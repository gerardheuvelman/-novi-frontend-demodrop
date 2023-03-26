import React, {useEffect, useState} from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import {Link, useParams} from "react-router-dom";
import ConversationForm from "../../../components/formComponents/ConversationForm/ConversationForm";
import styles from './ConversationFormPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {GetRequest} from "../../../helpers/axiosHelper";
import MainComponent from "../../../components/otherComponents/structuralComponents/MainComponent/MainComponent";

function ConversationFormPage({mode, type}) { // modes: 'admin' or others; types: 'create' or 'update'
    const {demoId} = useParams();
    const {conversationId} = useParams();
    console.log('mode in ConversationFromPage: ', mode);
    console.log('type in ConversationFromPage: ', type);
    console.log('demoId from params: ', demoId);
    console.log('conversationId from params: ', conversationId);
    const [conversation, setConversation] = useState(null);

    useEffect(() => {
        async function fetchDemoDetails() {
            console.log('Now making GET request to fetch the demo details: ')
            const response = await new GetRequest(`/demos/${demoId}`).invoke();
            console.log('fetchDemoDetails() response: ', response);
            setConversation(
                {
                    subject: `inq: "${response.data.title}"`,
                    body: "",
                    demo:
                        {
                            demoId: response.data.demoId,
                            title: response.data.title
                        }
                }
            )
        }

        if (type === 'create') {
            void fetchDemoDetails();
        }
    }, []);


    useEffect(() => {
        async function fetchConversation() {
            const response = await new GetRequest(`/conversations/${conversationId}`).invoke();
            prepareConversation(response.data);
            setConversation(response.data);
        }

        if (type === 'update') {
            void fetchConversation();
        }
    }, []);

    function prepareConversation(conversation) {
        console.log('conversation to be prepared for display: ', conversation);

        // add "Re:" to the message subject
        let msgSubject = conversation.subject;
        const desiredSubjectPrefix = 'Re: ';
        const foundSubjectPrefix = msgSubject.substring(0, 4);
        console.log(`Prefix found in original message subject: "${foundSubjectPrefix}"`);

        if (foundSubjectPrefix !== desiredSubjectPrefix) {
            msgSubject = desiredSubjectPrefix + msgSubject;
            conversation.subject = msgSubject;
        }

        // next jeb: indent body with "| " :
        const msgBody = conversation.body;
        console.log('original message body:\n', msgBody);
        const linePrefix = '|> ';
        // first, split te body into an array of lines
        const lines = msgBody.split('\n');
        console.log('lines array just after splitting: ', lines);
        // indent each line separately:
        const prefixedLines = lines.map(line => linePrefix + line);
        // add two blank lines to the beginning of the lines array.
        prefixedLines.unshift("", "");
        console.log('prefixedLines after ushifting: ', prefixedLines);
        // now, convert array back to a single string and assign it back to the message body:
        conversation.body = prefixedLines.join('\n');

        // finally , return the conversation.
        return conversation;
    }

    return (
        <>
            {conversation &&
                <>
                    <Header>
                        {type === 'create' &&
                            <>
                                {mode !== 'admin' && <h3>Inquire about a demo</h3>}
                                {mode !== 'admin' && <h4>{`... for demo "${conversation.demo.title}"`}</h4>}
                                {mode === 'admin' && <h3>{`Send message to producer`}</h3>}
                                {mode === 'admin' && <h4>{`about demo "${conversation.demo.title}"`}</h4>}
                            </>}
                        {type === 'update' &&
                            <>
                                {mode !== 'admin' && <h3>reply to a message</h3>}
                                {mode !== 'admin' && <h4>{`... for demo "${conversation.demo.title}"`}</h4>}
                                {mode === 'admin' && <h3>{`reply to producer`}</h3>}
                                {mode === 'admin' && <h4>{`concerning demo "${conversation.demo.title}"`}</h4>}
                            </>}
                    </Header>
                    <MainComponent>
                        {conversation && <ConversationForm mode={mode} type={type} prefillConversation={conversation}/>}
                    </MainComponent>
                    <Footer/>
                </>
            }
        </>
    );
}

export default ConversationFormPage;