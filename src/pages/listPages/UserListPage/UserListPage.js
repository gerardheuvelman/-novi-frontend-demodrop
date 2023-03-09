import React, {useContext, useEffect, useState} from 'react';
import Header from "../../../components/otherComponents/structuralComponents/Header/Header";
import UserList from "../../../components/listComponents/UserList/UserList";
import styles from './UserListPage.module.css';
import Footer from "../../../components/otherComponents/structuralComponents/Footer/Footer";
import {Link, useLocation} from "react-router-dom";
import DeleteButton from "../../../components/otherComponents/buttons/DeleteButton/DeleteButton";

function UserListPage({mode}) { // mode has only one possible value: 'admin'
    const location = useLocation();
    const [limit, setLimit] = useState(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const limitParam = queryParams.get('limit');
        setLimit(limitParam || '');
    }, [location.search]);
    console.log('Limit from query string: ',limit);

    return (
        <>
            <Header>
                <h1>User list (admin mode)</h1>
                <h4>a list of all users</h4>
            </Header>
            <main>
                <div className="page-container">
                    <UserList mode={mode} limit={limit}></UserList>
                </div>
                <p><Link onClick={() => window.history.back()} to="#">{` <<Back`}</Link></p>
            </main>
            <Footer/>
        </>
    );
}

export default UserListPage;