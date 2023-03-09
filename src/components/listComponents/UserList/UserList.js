import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import styles from './UserList.module.css';
import {GetRequest} from "../../../helpers/axiosHelper";

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
                    <th>Email</th>
                    <th>Enabled</th>
                    {mode === 'admin' && <th>Edit</th>}
                </tr>
                </thead>
                <tbody>
                {users.map((user) => {
                    return <tr key={user.username}>
                        <td>{user.createdDate}</td>
                        {mode === 'user' && <td><Link to={`/admin/users/${user.username}`}>{user.username}</Link></td>}
                        {mode === 'admin' && <td>{user.username}</td>}
                        <td>{user.email}</td>
                        <td>
                            <input
                                type="checkbox"
                                checked={user.enabled}
                                readOnly
                            />
                        </td>
                        {mode === 'admin' && <td><Link to={`/admin/users/${user.username}`}>Edit</Link></td>}
                    </tr>
                })}
                </tbody>
            </table>
            {users.length === 0 && <p>There are no users that match your search criteria...</p>}
        </>
    );
}

export default UserList;