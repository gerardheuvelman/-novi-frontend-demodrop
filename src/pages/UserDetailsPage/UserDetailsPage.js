import React, {useContext, useEffect, useState} from 'react';
import {Link, NavLink, useParams} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import Header from "../../components/Header/Header";
import styles from './UserDetailsPage.module.css';
import Footer from "../../components/Footer/Footer";
import {GetRequest} from "../../helpers/axiosHelper";
import UserDetails from "../../components/UserDetails/UserDetails";

function UserDetailsPage({mode}) { // modes: 'anon', 'personal' or 'admin'
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
                {mode === 'anon' && <h1>User profile</h1>}
                {(userDetails && mode === 'anon') && <h4>{`for user "${userDetails.username}"`}</h4>}
                {mode === 'personal' && <h1>My profile page</h1>}
                {mode === 'personal' && <h4> view your profile here</h4>}
                {mode === 'admin' && <h1>User details (admin mode)</h1>}
                {mode === 'admin' && <h4>{`...for user ${username}`}</h4>}
            </Header>
            {userDetails &&
                <main>
                    <UserDetails userDetails={userDetails} mode={mode}/>
                </main>
            }
            <Footer/>
        </>
    );
}

export default UserDetailsPage;