import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import authContext, {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import Header from "../../components/header/Header";

function Profile() {
    const [privateUserData, setPrivateUserData] = useState("")
    const {user: {name, email, username}} = useContext(AuthContext);
    useEffect(() => {
        const controller = new AbortController();
        const storedToken = localStorage.getItem("token");

        async function fetchPrivateUserData() {
            try {
                const response = await axios.get(`http://localhost:8080/users/${authContext.username}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${storedToken}`,
                    },
                    signal: controller.signal
                });
                setPrivateUserData(response.data)
                console.log(response);
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
                    <p><strong>Username:</strong>{name}</p>
                    <p><strong>Email:</strong>{email}</p>
                </section>
                <section>
                    {privateUserData.enabled && <h2>Your account is enabled!</h2>}
                    <p>Back to the <Link to="/">Home page</Link></p>
                </section>
            </main>
        </>
    );
}

export default Profile;