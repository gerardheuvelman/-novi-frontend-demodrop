import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import styles from './UserList.module.css';
import {DeleteRequest, GetRequest} from "../../../helpers/axiosHelper";
import {DateTime} from "../../../helpers/dateTimeHelper";
import SmartTable from "../../otherComponents/SmartTable/SmartTable";
import {AuthContext} from "../../../context/AuthContext";
import {SelectionContext} from "../../../context/SelectionContext";
import DeleteButton from "../../otherComponents/buttons/DeleteButton/DeleteButton";

function UserList({mode, limit, onDeleteSelected}) { // currently, mode can only be "admin"
    const {selectedUsers, selectUser, deselectUser } = useContext(SelectionContext);
    const [users, setUsers] = useState([]);
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    console.log('SERVER_URL: ', SERVER_URL);

    useEffect(() => {
        async function fetchUsers() {
            const response = await new GetRequest(`/users/private?limit=${limit}`).invoke();
            setUsers(response.data);
        }
        void fetchUsers();
    }, []);

    console.log('userList selectedUsers: ',selectedUsers);

    // handler for checkbox change events
    function handleUserSelect(username) {
        console.log('handleUserSelect invoked, with username = ', username);
        if (selectedUsers.includes(username)){
            deselectUser(username);
        } else {
            selectUser(username);
        }
    }

    return (
        <>
            {console.log('selectedUsers: ', selectedUsers)}
            <SmartTable>
                <thead>
                <tr>
                    {/*<th className='priority-1'></th>*/}
                    <th className='priority-6'>Date</th>
                    <th className='priority-8'>Time</th>
                    <th className='priority-1'>Username</th>
                    <th className='priority-7'>Email</th>
                    <th className='priority-5'>Enabled</th>
                    {mode === 'admin' && <th className='priority-1'>View</th>}
                    {mode === 'admin' && <th className='priority-9'>Edit</th>}
                </tr>
                </thead>
                <tbody>
                {users.map((user) => {
                    const dateTimeCreated = new DateTime(user.createdDate);
                    return <tr key={user.username}>
                        <td className='priority-6'>{dateTimeCreated.getDateString()}</td>
                        <td className='priority-8'>{dateTimeCreated.getTimeString()}</td>
                        {mode === 'user' && <td className='priority-1'><Link to={`/admin/users/${user.username}`}>{user.username}</Link></td>}
                        {mode === 'admin' && <td className='priority-1'>{user.username}</td>}
                        <td className='priority-7'>{user.email}</td>
                        <td className='priority-5'>
                            <input
                                type="checkbox"
                                checked={user.enabled}
                                readOnly
                            />
                        </td>
                        {mode === 'admin' && <td className='priority-1'><Link to={`/admin/users/${user.username}`}>View</Link></td>}
                        {mode === 'admin' && <td className='priority-9'><Link to={`/admin/users/${user.username}/edit`}>Edit</Link></td>}
                    </tr>
                })}
                {users.length === 0 && <td>There are no users that match your search criteria...</td>}
                </tbody>
            </SmartTable>
        </>
    );
}

export default UserList;