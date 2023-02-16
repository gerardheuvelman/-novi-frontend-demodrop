import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import authContext, {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import Header from "../../components/Header/Header";
import styles from './UserProfilePage.module.scss';
import Footer from "../../components/Footer/Footer";

function UserProfilePage() {
    const [privateUserData, setPrivateUserData] = useState("")
    const {user: {name, email, username}} = useContext(AuthContext);
    useEffect(() => {
        const controller = new AbortController();
        const storedToken = localStorage.getItem("token");
        async function fetchPrivateUserData() {
            try {
                const response = await axios.get(`http://localhost:8080/users/${username}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${storedToken}`,
                    },
                    signal: controller.signal
                });
                console.log(response.data);
                setPrivateUserData(response.data)
            } catch (e) {
                console.log(e)
            }
        }

        void fetchPrivateUserData();
        return function cleanup() {
            controller.abort(); // <--- cancel request
            console.log("Cleanup has been executed")
        }
    }, [])

    return (
        <>
            <Header>
                <h1>Profile page</h1>
                <h4> view your profile here</h4>
            </Header>
            <main>
                <section>
                    <h2>Personal details</h2>
                    <p><strong>Username: </strong>{username}</p>
                    <p><strong>Email: </strong>{email}</p>
                </section>
                <section>
                    {privateUserData.enabled && <h2>Your account is enabled!</h2>}
                    <p><Link to={`/users/${username}/change-password`}>change password</Link></p>
                    {/*<p> <Link to={`/users/${username}/change-email`}>change email</Link></p>*/}
                    <p>Back to the <Link to="/">Home page</Link></p>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default UserProfilePage;