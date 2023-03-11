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
            <Header>
                {(mode === 'anon' || mode === 'personal') && <h1>User profile</h1>}
                {userDetails && (mode === 'anon' || mode === 'personal') && <h4>{`for user "${userDetails.username}"`}</h4>}
                {mode === 'owner' && <h1>My profile</h1>}
                {mode === 'owner' && <h4> view your profile here</h4>}
                {mode === 'admin' && <h1>User details (admin mode)</h1>}
                {mode === 'admin' && <h4>{`...for user ${username}`}</h4>}
            </Header>
            {userDetails &&
                <main>
                    <section>
                        <UserDetails userDetails={userDetails} mode={mode}/>
                        {mode !== 'owner' && <DemoList mode='personal' limit={0}/>}
                    </section>
                    {mode === "admin" && <section>
                        {mode === 'admin' && <td><Link to={`/admin/users/${userDetails.username}/edit`}>Edit this user</Link></td>}
                        {(mode === 'owner' || mode === 'admin') && <p><DeleteButton entityName="user" entityId={userDetails.username} mode={mode}>Delete user</DeleteButton></p>}

                        {<p><AccountStateToggleButton user={userDetails}/></p>}
                        {<p>Back to the <Link to="/admin/users">Admin user List</Link></p>}
                    </section>}
                    <p><Link onClick={() => window.history.back()} to="#">{` <<Back`}</Link></p>
                </main>
            }
            <Footer/>
        </>
    );
}

export default UserDetailsPage;