import React, {useContext, useEffect, useState} from 'react';
import {Link, NavLink, useParams} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import Header from "../../components/Header/Header";
import styles from './UserProfilePage.module.css';
import Footer from "../../components/Footer/Footer";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import AccountStateToggleButton from "../../components/AccountStateToggleButton/AccountStateToggleButton";
import {GetRequest} from "../../helpers/axiosHelper";

function UserProfilePage({mode}) { // mode: 'personal' or 'admin'
    const {user} = useContext(AuthContext); // This is the PRINCIPAL user!
    const {username} = useParams(); // Used to fetch user details
    const [userDetails, setUserDetails] = useState(null);
    console.log('mode: ', mode);

    useEffect(() => {
        const controller = new AbortController();
        const storedToken = localStorage.getItem("token");
        console.log('usernameFromParams: ', username);

        async function fetchUserDetails() {
            const response = await new GetRequest(`/users/${username}`).invoke();
            setUserDetails(response.data);
        }

        void fetchUserDetails();
        return function cleanup() {
            controller.abort(); // <--- cancel request
            console.log("Cleanup has been executed")
        }
    }, [])

    return (
        <>
            <Header>
                {mode === 'personal' && <h1>My profile page</h1>}
                {mode === 'personal' && <h4> view your profile here</h4>}
                {mode === 'admin' && <h1>User details (admin mode)</h1>}
                {mode === 'admin' && <h4>{`...for user ${username}`}</h4>}
            </Header>
            {userDetails &&
                <main>
                    <section>
                        <h2>Personal details</h2>
                        <p><strong>Username: </strong>{userDetails.username}</p>
                        <p><strong>Email: </strong>{userDetails.email}</p>
                        <p><Link to={`/users/${userDetails.username}/change-email`}>change email</Link></p>
                        <p><Link to={`/users/${userDetails.username}/change-password`}>change password</Link></p>
                    </section>
                    <section>
                        {mode === 'admin' && <p><AccountStateToggleButton username={username}/></p>}
                        {mode === 'admin' &&
                            <p><DeleteButton entitiesName='users' entityId={userDetails.username} mode='admin'>Delete
                                this user (permanently!)</DeleteButton></p>}
                        {user.authority === 'ROLE_USER' && <p>Back to the <Link to="/">Home page</Link></p>}
                        {user.authority === 'ROLE_ADMIN' && <p>Back to the <Link to="/">User List</Link></p>}
                    </section>
                </main>
            }
            <Footer/>
        </>
    );
}

export default UserProfilePage;