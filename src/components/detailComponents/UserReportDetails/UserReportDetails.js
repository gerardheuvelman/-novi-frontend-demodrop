import {Link} from "react-router-dom";
import DeleteButton from "../../otherComponents/buttons/DeleteButton/DeleteButton";
import React, {useEffect, useState} from "react";
import styles from './UserReportDetails.module.css';
import {DateTime} from "../../../helpers/dateTimeHelper";
import {GetRequest} from "../../../helpers/axiosHelper";

function UserReportDetails({userReport, mode, type}) { //  modes: 'admin'; types: 'user', 'demo' or 'conversation'
    const [user, setUser] = useState(null);
    const [demo, setDemo] = useState(null);
    const [conversation, setConversation] = useState(null);
    const dateTimeCreated = new DateTime(userReport.createdDate);
    const createdDate = dateTimeCreated.getDateString();
    const createdTime = dateTimeCreated.getTimeString();

    console.log('UserReportDetails type: ', type);

    useEffect(() => {
        async function fetchUser() {
            console.log('fetchUser invoked!');
            const response = await new GetRequest(`/users/${userReport.reportedUser.username}`).invoke();
            setUser(response.data);
        }

        if (type === 'user') {
            void fetchUser();
        }
    }, []);

    useEffect(() => {
        async function fetchDemo() {
            console.log('fetchDemo invoked!');
            const response = await new GetRequest(`/demos/${userReport.reportedDemo.demoId}`).invoke();
            setDemo(response.data);
        }

        if (type === 'demo') {
            void fetchDemo();
        }
    }, []);

    useEffect(() => {
        async function fetchConversation() {
            console.log('fetchConversation invoked!');
            const response = await new GetRequest(`/conversations/${userReport.reportedConversation.conversationId}`).invoke();
            setConversation(response.data);
        }

        if (type === 'conversation') {
            void fetchConversation();
        }
    }, []);

    return (
        <>
            {userReport &&
                <section className='details-section'>
                    <article className='details-info'>
                        <h4>Created</h4>
                        <span>
                            {createdDate} {createdTime}
                        </span>
                        <h4>User report ID</h4>
                        {userReport.userReportId}
                        {userReport.reporter &&
                            <>
                                <h4>Reporter</h4>
                                <Link
                                    to={`/admin/users/${userReport.reporter.username}`}>{userReport.reporter.username}</Link>
                            </>
                        }
                        {userReport.reportedDemo &&
                            <>
                                <h4>Reported demo</h4>
                                <Link to={`/admin/demos/${userReport.reportedDemo.demoId}`}>
                                    {userReport.reportedDemo.title}
                                </Link>
                            </>
                        }
                        <h4>Subject</h4>
                        <input disabled={true} value={userReport.subject}></input>
                        <textarea rows={10} cols={50} disabled={true} value={userReport.body}/>
                    </article>
                    <article className='details-controls'>
                        <h3>Available actions</h3>
                        <Link to={`/admin/users/${userReport.reporter.username}/sendmessage`}>Send message to
                            reporter</Link>
                        {(mode === 'admin') &&
                            <DeleteButton
                                color='white'
                                entityName="userreport"
                                entityId={userReport.userReportId}
                                friendlyId={userReport.subject}
                                mode={mode}
                                type='single'
                            >Delete this UserReport
                            </DeleteButton>}
                        {mode === 'admin' &&
                            <span>
                                Back to the <Link to="/admin/userreports">User reports list</Link>
                            </span>}
                    </article>
                </section>}
        </>);
}

export default UserReportDetails;