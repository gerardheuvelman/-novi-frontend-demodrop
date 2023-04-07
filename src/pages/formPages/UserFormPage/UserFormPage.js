import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import styles from './UserFormPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import UserForm from "../../../components/formComponents/UserForm/UserForm";
import {GetRequest} from "../../../helpers/axiosHelper";
import MainComponent from "../../../components/otherComponents/structuralComponents/MainComponent/MainComponent";

function UserFormPage({mode, type}) { // modes : 'anon' or 'admin; types: 'create', 'createadmin', or 'update'
    const {username} = useParams();
    const [user, setUser] = useState(null);

    console.log('type in UserFormPage: ', type);

    useEffect(() => {
        async function fetchUser() {
            const response = await new GetRequest(`/users/${username}/private`).invoke();
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
            {user &&
                <>
                    <Header>
                        {type === 'create' &&
                            <>
                                {mode === 'anon' && <h3>Register yourself</h3>}
                                {mode === 'admin' && <h3>Register new user</h3>}
                                {mode === 'anon' && <h4>create your personal user account</h4>}
                                {mode === 'admin' && <h4>create a new user account</h4>}
                            </>}
                        {type === 'createadmin' &&
                            <>
                                <h3>Register a new administrator</h3>
                                <h4>create a new admin account</h4>
                            </>}
                        {type === 'update' &&
                            <>
                                <h3>Edit User details</h3>
                                <h4>{`Edit form for user "${username}"`}</h4>
                            </>}
                    </Header>
                    <MainComponent>
                        {user && <UserForm mode={mode} type={type} prefillUser={user}/>}
                    </MainComponent>
                    <Footer/>
                </>
            }
        </>
    );
}

export default UserFormPage;