import React, {useContext, useEffect, useState} from 'react';
import {Link, NavLink, useParams} from 'react-router-dom';
import {AuthContext} from "../../../context/AuthContext";
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import styles from './UserReportDetailsPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {GetRequest} from "../../../helpers/axiosHelper";
import UserDetails from "../../../components/detailComponents/UserDetails/UserDetails";
import DemoList from "../../../components/listComponents/DemoList/DemoList";
import DeleteButton from "../../../components/otherComponents/buttons/DeleteButton/DeleteButton";
import AccountStateToggleButton
    from "../../../components/otherComponents/buttons/AccountStateToggleButton/AccountStateToggleButton";
import MainComponent from "../../../components/otherComponents/structuralComponents/MainComponent/MainComponent";
import UserReportDetails from "../../../components/detailComponents/UserReportDetails/UserReportDetails";

function UserReportDetailsPage({mode}) { // modes: 'admin'
    const {userReportId} = useParams(); // Used to fetch user details
    const [userReportDetails, setUserReportDetails] = useState(null);
    console.log('mode: ', mode);

    useEffect(() => {
        async function fetchUserReportDetails() {
            const response = await new GetRequest(`/userreports/${userReportId}`).invoke();
            setUserReportDetails(response.data);
        }

        void fetchUserReportDetails();
    }, [])

    return (
        <>
            {userReportDetails &&
                <>
                    <Header>
                        {mode === 'admin' && <h3>User report details</h3>}
                        {mode === 'admin' && <h4>{`...for user report ${userReportId}`}</h4>}
                    </Header>
                    <MainComponent>
                        <UserReportDetails userReport={userReportDetails} mode={mode} type={userReportDetails.type}/>
                    </MainComponent>
                    <Footer/>
                </>}

        </>
    );
}

export default UserReportDetailsPage;