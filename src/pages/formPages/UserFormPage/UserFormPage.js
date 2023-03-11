import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import styles from './UserFormPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import UserForm from "../../../components/formComponents/UserForm/UserForm";
import {GetRequest} from "../../../helpers/axiosHelper";

function UserFormPage({mode, type}) { // modes : 'anon' or 'admin; types: 'create', 'createadmin', or 'update'
    const {username} = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            const response = await new GetRequest(`/users/${username}`).invoke();
            setUser(response.data);
        }
        if (type === 'update')
        void fetchUser();
    }, []);

    useEffect(() => {
        function setUserToBlankUser() {
            const blankUser = {
                username: null,
                password: null,
                email: null
            };
            setUser(blankUser);
        }
        if (type === 'create' || type === 'createadmin')
            void setUserToBlankUser();
    }, []);

    console.log('UserFormPage username: ', username);
    console.log('UserFormPage user: ', user);

    return (
    <>
        <Header>
            {type === 'create' &&
                <>
                    {mode  === 'anon' && <h1>Register yourself</h1>}
                    {mode  === 'admin' && <h1>Register new user</h1>}
                    {mode  === 'anon' && <h2>create your personal user account</h2>}
                    {mode  === 'admin' && <h2>create a new user account</h2>}
                </>}
            {type === 'createadmin' &&
                <>
                    <h1>Register a new administrator</h1>
                    <h2>create a new admin account</h2>
                </>}
            {type === 'update' &&
                <>
                    <h1>Edit User details</h1>
                    <h2>{`Edit form for user "${username}"`}</h2>
                </>}
        </Header>
        <main>
            {user && <UserForm mode={mode} type={type} prefillUser={user} />}
            {mode !== 'admin' && <p>Have an account already? Sign in <Link to="/login">here</Link> .</p>}
            <p><Link onClick={() => window.history.back()} to="#">{` <<Back`}</Link></p>
        </main>
        <Footer/>
    </>
  );
}

export default UserFormPage;