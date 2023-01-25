import React, {useEffect, useState} from 'react';
import axios from "axios";
import './DemoList.css';
import Header from "../../components/header/Header";
import {Link} from "react-router-dom";

function DemoList(props) {
    const [demos, setDemos] = useState([]);

    useEffect(() => { // TODO: Moderniseren
        async function fetchDemos() {
            try {
                const response = await axios.get('http://localhost:8080/demos');
                // Plaats alle demos in de state zodat we het op de pagina kunnen gebruiken
                console.log(response.data); // LET OP: GEEF IK OOK EEN DATA OBJECT TERUG IN DE BACK-END? (volgens mij niet)
                setDemos(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchDemos();
    }, []);

    return (
        <>
            <Header>
                <h1>Demo list</h1>
                <h4>a list of all demos in the system</h4>
            </Header>
            <main>
                <div className="page-container">
                    <h1>Demo List</h1>
                    <table>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>BPM</th>
                            <th>Length</th>
                        </tr>
                        </thead>
                        <tbody>
                        {demos.map((demo) => {
                            // De key moet op het buitenste element staan en uniek zijn
                            return <tr key={demo.demoId}>
                                <td>{demo.createdDate}</td>
                                <td><Link to={`/demos/${demo.demoId}`}/>{demo.title}</td>
                                <td>{demo.genre.name}</td>
                                <td>{demo.bpm}</td>
                                <td>{demo.length}</td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
}

export default DemoList;