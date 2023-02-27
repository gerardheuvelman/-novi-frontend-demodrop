import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import styles from './UserList.module.css';
import {GetRequest} from "../../helpers/axiosHelper";

function UserList({mode, limit}) { // currently, mode can only be "admin"
    const [users, setUsers] = useState([]);
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    console.log('SERVER_URL: ', SERVER_URL);

    useEffect(() => {
        async function fetchUsers() {
            const response = await new GetRequest(`/users?limit=${limit}`).invoke();
            setUsers(response.data);
        }
        void fetchUsers();
    }, []);

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>Created Date</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Enabled</th>
                    <th>API key</th>
                    <th>Email</th>
                    {mode === 'admin' && <th>Edit</th>}
                </tr>
                </thead>
                <tbody>
                {users.map((user) => {
                    return <tr key={user.username}>
                        <td>{user.createdDate}</td>
                        <td><Link to={`/users/${user.username}/profile`}>{user.username}</Link></td>
                        <td>{user.password}</td>
                        <td>{user.enabled}</td>
                        <td>{user.apikey}</td>
                        <td>{user.email}</td>
                        {mode === 'admin' && <td><Link to={`/admin/users/${user.username}`}>Edit</Link></td>}
                    </tr>
                })}
                </tbody>
            </table>
        </>
    );
}

export default UserList;