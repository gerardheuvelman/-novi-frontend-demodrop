import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import styles from './UserReportList.module.css';
import {DeleteRequest, GetRequest} from "../../../helpers/axiosHelper";
import {DateTime} from "../../../helpers/dateTimeHelper";
import SmartTable from "../../otherComponents/SmartTable/SmartTable";
import {SelectionContext} from "../../../context/SelectionContext";

function UserReportList({mode, limit, onDeleteSelected}) { // currently, mode can only be "admin"
    const {selectedUserReports, selectUserReport, deselectUserReport } = useContext(SelectionContext);
    const [userReports, setUserReports] = useState([]);
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    console.log('SERVER_URL: ', SERVER_URL);

    useEffect(() => {
        async function fetchUsers() {
            const response = await new GetRequest(`/userreports?limit=${limit}`).invoke();
            setUserReports(response.data);
        }
        void fetchUsers();
    }, []);

    console.log('userReportList selectedUserReports: ',selectedUserReports);

    // handler for checkbox change events
    function handleUserReportSelect(userReportId) {
        console.log('handleUserReportSelect invoked, with userReportID = ', userReportId);
        if (selectedUserReports.includes(userReportId)){
            deselectUserReport(userReportId);
        } else {
            selectUserReport(userReportId);
        }
    }

    return (
        <>
            {console.log('selectedUserReports: ', selectedUserReports)}
            <SmartTable>
                <thead>
                <tr>
                    <th className='priority-6'>Date</th>
                    <th className='priority-9'>Time</th>
                    <th className='priority-4'>Type</th>
                    <th className='priority-5'>Reporter</th>
                    <th className='priority-10'>Subject</th>
                    {mode === 'admin' && <th className='priority-1'>View</th>}
                </tr>
                </thead>
                <tbody>
                {console.log("UserReports in UserReportList: ", userReports)}
                {userReports.map((userReport) => {
                    const dateTimeCreated = new DateTime(userReport.createdDate);
                    return <tr key={userReport.username}>
                        <td className='priority-6'>{dateTimeCreated.getDateString()}</td>
                        <td className='priority-9'>{dateTimeCreated.getTimeString()}</td>
                        {userReport.type === 'user' && <td className='priority-4'>user</td>}
                        {userReport.type === 'demo' && <td className='priority-4'>demo</td>}
                        {userReport.type === 'conversation' && <td className='priority-4'>conversation</td>}
                        <td className='priority-5'>{userReport.reporter.username}</td>
                        {mode === 'admin' && <td className='priority-10'>{userReport.subject}</td>}
                        {mode === 'admin' && <td className='priority-1'><Link to={`/admin/userreports/${userReport.userReportId}`}>View</Link></td>}
                    </tr>
                })}
                {userReports.length === 0 && <td>There are no user reports that match your search criteria...</td>}
                </tbody>
            </SmartTable>
        </>
    );
}

export default UserReportList;