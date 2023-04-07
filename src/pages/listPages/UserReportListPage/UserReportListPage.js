import React, {useContext, useEffect, useState} from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import styles from './UserReportListPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import MainComponent from "../../../components/otherComponents/structuralComponents/MainComponent/MainComponent";
import UserReportList from "../../../components/listComponents/UserReportList/UserReportList";

function UserReportListPage({mode}) { // Values for "mode":  'admin'

    return (
        <>
            <Header>
                {mode === 'admin' && <h3>User report list</h3>}
                {mode === 'admin' && <h4>Reports from users about demos</h4>}
            </Header>
            <MainComponent>
                    <UserReportList mode={mode} limit={0}/>
            </MainComponent>
            <Footer/>
        </>
    );
}

export default UserReportListPage;