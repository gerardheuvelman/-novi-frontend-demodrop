import React, {useContext, useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import UserList from "../../components/UserList/UserList";
import styles from './UserListPage.module.css';
import Footer from "../../components/Footer/Footer";
import {Link} from "react-router-dom";
import DeleteButton from "../../components/DeleteButton/DeleteButton";

function UserListPage({mode, limit}) { // mode has only one possible value: 'admin'

    return (
        <>
            <Header>
                <h1>User list</h1>
                <h4>a list of all users</h4>
            </Header>
            <main>
                <div className="page-container">
                    <UserList mode={mode} limit={limit}></UserList>
                    <DeleteButton ></DeleteButton>
                </div>

            </main>
            <Footer/>
        </>
    );
}

export default UserListPage;