import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import styles from './UserList.module.scss';

function UserList({mode}, limit) {
    const [users, setUsers] = useState([]);
    const {isAuth, user} = useContext(AuthContext);
    const storedToken = localStorage.getItem("token");

    useEffect(() => { // TODO: Moderniseren
        async function fetchUsers() {
            try {
                const response = await axios.get(`http://localhost:8080/users?limit=${limit}`,{
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${storedToken}`,
                    }
                    // , signal: controller.signal
                });
                // Plaats alle demos in de state zodat we het op de pagina kunnen gebruiken
                console.log(response.data);
                setUsers(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchUsers();
        console.log(users); // deze log is een lege array!! Maar in de tabel staat wel data dus HOE KOMT DIT? Mishcine omdat dit "achterloopt", zoals Sam zei??
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
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => {
                    // De key moet op het buitenste element staan en uniek zijn
                    return <tr key={user.username}>
                        <td>{user.createdDate}</td>
                        <td><Link to={`/users/${user.username}`}>{user.username}</Link></td>
                        <td>{user.password}</td>
                        <td>{user.enabled}</td>
                        <td>{user.apikey}</td>
                        <td>{user.email}</td>
                        <td><Link to={`/users/edit/${user.username}`}>Edit</Link></td>
                        <td><Link to={`/users/delete/${user.username}`}>Delete</Link></td>
                    </tr>
                })}
                </tbody>
            </table>
        </>
    );
}

export default UserList;