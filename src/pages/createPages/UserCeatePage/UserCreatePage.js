import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import { useForm } from 'react-hook-form';
import InputComponent from "../../../components/otherComponents/others/InputComponent/InputComponent";
import styles from './UserCreatePage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {PostRequest} from "../../../helpers/axiosHelper";
import UserForm from "../../../components/formComponents/UserForm/UserForm";

function UserCreatePage({mode}) { // modes: 'anon', 'admin' or 'newadmin'

    return (
    <>
        <Header>
            {mode  === 'anon' && <h1>Register yourself</h1>}
            {mode  === 'admin' && <h1>Register new user</h1>}
            {mode  === 'newadmin' && <h1>Register a new administrator</h1>}
            {mode  === 'anon' && <h4>create your personal user account</h4>}
            {mode  === 'admin' && <h4>create a new user account</h4>}
            {mode  === 'newadmin' && <h4>create a new admin account</h4>}
        </Header>
        <main>
            <UserForm mode={mode}/>
            <p>Have an account already? Sign in <Link to="/login">here</Link> .</p>
            <p><Link onClick={() => window.history.back()} to="#">{` <<Back`}</Link></p>
        </main>
        <Footer/>
    </>
  );
}

export default UserCreatePage;