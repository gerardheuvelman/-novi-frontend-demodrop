import React, {useEffect, useState} from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import {Link, useParams} from "react-router-dom";
import ConversationForm from "../../../components/formComponents/ConversationForm/ConversationForm";
import styles from './ConversationCreatePage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {GetRequest} from "../../../helpers/axiosHelper";

function ConversationCreatePage({mode}) { // modes: 'admin' or others
    const {demoId} = useParams();
    console.log('demoId from params: ', demoId);
    const [freshNewConversation, setFreshNewConversation] = useState(null);

    useEffect(() => {
        async function fetchDemoDetails() {
            console.log('Now making GET request to fetch the demo details: ')
            const response = await new GetRequest(`/demos/${demoId}`).invoke();
            console.log('fetchDemoDetails() response: ', response);
            setFreshNewConversation(
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

        void fetchDemoDetails();
    }, []);

    return (
        <>
            <Header>
                {mode !== 'admin' && <h1>Inquire about a demo</h1>}
                {mode !== 'admin' && <h2>{`... for demo "${freshNewConversation.demo.title}"`}</h2>}
                {mode === 'admin' && <h1>{`Send message to producer`}</h1>}
                {mode === 'admin' && <h2>{`about demo "${freshNewConversation.demo.title}"`}</h2>}
            </Header>
            <main>
                {freshNewConversation && <ConversationForm mode='create' prefillConversation={freshNewConversation}/>}
                <p><Link onClick={() => window.history.back()} to="#">{` <<Back`}</Link></p>
            </main>
            <Footer/>
        </>
    );
}

export default ConversationCreatePage;