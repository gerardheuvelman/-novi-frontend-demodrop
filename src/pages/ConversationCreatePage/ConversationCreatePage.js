import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import {useParams} from "react-router-dom";
import ConversationForm from "../../components/ConversationForm/ConversationForm";
import styles from './ConversationCreatePage.module.css';
import Footer from "../../components/Footer/Footer";
import axios from "axios";

const storedToken = localStorage.getItem("token");


function ConversationCreatePage() {
    const {demoId} = useParams();
    console.log('demoId: ', demoId);
    const [demo, setDemo] = useState(null);
    const [newConversation, setNewConversation] = useState(null);

    // Fetch the demo details:
    useEffect(() => {
        async function fetchDemoDetails() {
            console.log('Now trying to fetch demo details...');
            try {
                const response = await axios.get(`http://localhost:8080/demos/${demoId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${storedToken}`
                    }
                })
                console.log(`http://localhost:8080/demos/${demoId} yielded the following response: `, response);
                setDemo(response.data);
                setNewConversation(
                    {
                    subject: "",
                    body: "",
                    producer: {
                        username: response.data.user.username,
                        email:  response.data.user.email
                    }
                })
            } catch (e) {
                console.log(e)
            }
        }

        void fetchDemoDetails();
    }, [])

    const blankConversation = {

    };


    return (
        <>
            <Header>
                <h1>Inquire about a demo</h1>
            </Header>
            <main>
                {(demo && newConversation) && <ConversationForm demo={demo} mode='create' prefillConversation={newConversation}/>}
            </main>
            <Footer/>
        </>
    );
}

export default ConversationCreatePage;