import React, {useContext, useEffect, useState} from 'react';
import {Link, NavLink, useParams} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import Header from "../../components/Header/Header";
import styles from './UserProfilePage.module.css';
import Footer from "../../components/Footer/Footer";
import {GetRequest} from "../../helpers/axiosHelper";
import UserProfile from "../../components/UserProfile/UserProfile";

function UserProfilePage({mode}) { // mode: 'personal' or 'admin'
    const {user} = useContext(AuthContext); // This is the PRINCIPAL user!
    const {username} = useParams(); // Used to fetch user details
    const [userDetails, setUserDetails] = useState(null);
    console.log('mode: ', mode);

    useEffect(() => {
            async function fetchUserDetails() {
                const response = await new GetRequest(`/users/${username}`).invoke();
                setUserDetails(response.data);
            }
            void fetchUserDetails();
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
                    <UserProfile userDetails={userDetails} mode={mode}/>
                </main>
            }
            <Footer/>
        </>
    );
}

export default UserProfilePage;