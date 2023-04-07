import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import styles from './UserReportFormPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import UserReportForm from "../../../components/formComponents/UserReportForm/UserReportForm";
import {GetRequest} from "../../../helpers/axiosHelper";
import MainComponent from "../../../components/otherComponents/structuralComponents/MainComponent/MainComponent";

function UserReportFormPage({mode, type}) { // modes : many; types: 'demo', 'user' or 'conversation'
    const {demoId} = useParams();
    const {username} = useParams();
    const {conversationId} = useParams();
    const [demo, setDemo] = useState(null);
    const [conversation, setConversation] = useState(null);
    const [user, setUser] = useState(null);

    const [userReport, setUserReport] = useState(null);

    console.log('type in UserReportFormPage: ', type);

    useEffect(() => {
        async function fetchDemo() {
            const response = await new GetRequest(`/demos/${demoId}`).invoke();
            setDemo(response.data);
        }
        if (type === 'demo') {
            fetchDemo();
        }
    }, []);

    useEffect(() => {
        async function fetchConversation() {
            const response = await new GetRequest(`/conversations/${conversationId}`).invoke();
            setConversation(response.data);
        }
        if (type === 'conversation') {
            void fetchConversation();
        }
    }, []);

    useEffect(() => {
        async function fetchPublicUserInfo() {
            const response = await new GetRequest(`/users/${username}/public`).invoke();
            setUser(response.data);
        }
        if (type === 'user') {
            void fetchPublicUserInfo();
        }
    }, []);

    useEffect(() => {
            function setUserReportToBlankUserReport() {
                const blankUserReport = {
                    userReportId: null,
                    createdDate: null,
                    subject: null,
                    type: {type},
                    body: null
                };
                setUserReport(blankUserReport);
            }
            void setUserReportToBlankUserReport();
        }, [demo, conversation, user]);

    return (
        <>
            {userReport && (demo || conversation || user) &&
                <>
                    <Header>
                        {type === 'demo' && demo &&  <h3>{`Submit a report on demo "${demo.title}"`}</h3>}
                        {type === 'user' && username && <h3>{`Submit a report on user "${username}"`}</h3>}
                        {type === 'conversation' && <h3>{`Submit a report on conversation "${conversation.subject}"`}</h3>}
                        <h4>We appreciate your contribution!</h4>
                    </Header>
                    <MainComponent>
                        {userReport && <UserReportForm mode={mode} type={type} prefillUserReport={userReport} user={user} demo={demo} conversation={conversation}/>}
                    </MainComponent>
                    <Footer/>
                </>
            }
        </>
    );
}

export default UserReportFormPage;