import React, {useContext, useEffect, useState} from 'react';
import {Link, NavLink, useParams} from 'react-router-dom';
import {AuthContext} from "../../../context/AuthContext";
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import styles from './UserDetailsPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {GetRequest} from "../../../helpers/axiosHelper";
import UserDetails from "../../../components/detailComponents/UserDetails/UserDetails";
import DemoList from "../../../components/listComponents/DemoList/DemoList";
import DeleteButton from "../../../components/otherComponents/buttons/DeleteButton/DeleteButton";
import AccountStateToggleButton
    from "../../../components/otherComponents/buttons/AccountStateToggleButton/AccountStateToggleButton";
import MainComponent from "../../../components/otherComponents/structuralComponents/MainComponent/MainComponent";

function UserDetailsPage({mode}) { // modes: 'anon','personal', 'owner' or 'admin'
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
            {userDetails &&
                <>
                    <Header>
                        {(mode === 'anon' || mode === 'personal') && <h3>User profile</h3>}
                        {userDetails && (mode === 'anon' || mode === 'personal') &&
                            <h4>{`for user "${userDetails.username}"`}</h4>}
                        {mode === 'owner' && <h3>My profile</h3>}
                        {mode === 'owner' && <h4> view your profile here</h4>}
                        {mode === 'admin' && <h3>User details (admin mode)</h3>}
                        {mode === 'admin' && <h4>{`...for user ${username}`}</h4>}
                    </Header>
                    <MainComponent>
                        <UserDetails userDetails={userDetails} mode={mode}/>
                        {mode !== 'owner' && <DemoList mode='personal' limit={0}/>}
                    </MainComponent>
                    <Footer/>
                </>}

        </>
    );
}

export default UserDetailsPage;