import React, {useContext, useState} from 'react';
import Header from "../../components/Header/Header";
import styles from './DemoDeletePage.module.css';
import Footer from "../../components/Footer/Footer";
import {useNavigate, useParams} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

function DemoDeletePage() {
    const {user} = useContext(AuthContext)
    const {demoId} = useParams()
    const navigate = useNavigate();
    const [responseBody, setResponseBody] = useState('test');

    async function deleteDemo() {
        try {
            const response = await axios.delete(`http://localhost:8080/demos/${demoId}`);
            console.log('DELETE `http://localhost:8080/demos/${demoId}` yields the following result: ', response);
            setResponseBody(response.data);
        } catch (e) {
            console.error(e);
        }
        navigate(`/users/${user.username}/demos`);
    }

    return (

        <>
            <Header>
                <h1>Delete a demo</h1>
                <h4>...permanently!</h4>
            </Header>
                <main>
                    <h1>delete demo {demoId}?</h1>
                    <h4>{responseBody}</h4>
                    <p>
                    <span>
                        <button onClick={deleteDemo}>Delete</button>
                        <button onClick={() => navigate(`/users/${user.username}/demos`)}>Cancel</button>
                    </span>
                    </p>

                </main>
            <Footer/>
        </>
    );
}

export default DemoDeletePage;