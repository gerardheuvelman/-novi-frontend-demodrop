import React, {useContext, useEffect, useState} from 'react';
import './UserListPage.css';
import Header from "../../components/Header/Header";
import UserList from "../../components/UserList/UserList";
import styles from './UserListPage.module.scss';

function UserListPage({mode, limit}) {

    return (
        <>
            <Header>
                <h1>User list</h1>
                <h4>a list of all users</h4>
            </Header>
            <main>
                <div className="page-container">
                    <UserList mode={mode} limit={limit}></UserList>
                </div>
            </main>
        </>
    );
}

export default UserListPage;