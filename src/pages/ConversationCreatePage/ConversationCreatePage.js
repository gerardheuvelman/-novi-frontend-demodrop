import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import {useParams} from "react-router-dom";
import ConversationForm from "../../components/ConversationForm/ConversationForm";
import styles from './ConversationCreatePage.module.css';
import Footer from "../../components/Footer/Footer";
import {GetRequest} from "../../helpers/axiosHelper";

function ConversationCreatePage() {
    const {demoId} = useParams();
    console.log('demoId from params: ', demoId);
    const [freshNewConversation, setFreshNewConversation] = useState(null);

    useEffect(() => {
        async function fetchDemoDetails() {
            console.log('Now making GET request to fetch the demo details: ' )
            const response = await new GetRequest(`/demos/${demoId}`).invoke();
            console.log('fetchDemoDetails() response: ',response);
            setFreshNewConversation(
                {
                    subject: `inq: "${response.data.title}"`,
                    body: "",
                    demo:
                        {
                        demoId: response.data.demoId,
                        title:  response.data.title
                        }
                    }
            )
        }
        void fetchDemoDetails();
    }, []);

    return (
        <>
            <Header>
                <h1>Inquire about a demo</h1>
                {/*{console.log('freshNewConversation just before accessing it in the page header: ', freshNewConversation)}*/}
                {/*<h4>{`... for demo "${freshNewConversation.demo.title}"`}</h4>*/}
            </Header>
            <main>
                {/*{console.log('freshNewConversation in return statement: ',freshNewConversation)}*/}
                {freshNewConversation && <ConversationForm mode='create' prefillConversation={freshNewConversation}/>}
            </main>
            <Footer/>
        </>
    );
}

export default ConversationCreatePage;