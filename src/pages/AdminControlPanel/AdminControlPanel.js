import React, {useContext, useState} from 'react';
import Header from "../../components/Header/Header";
import logo from "../../assets/DemoDropLogo.png";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from '../../context/AuthContext';
import UserList from "../../components/UserList/UserList";
import DemoList from "../../components/DemoList/DemoList";
import ConversationList from "../../components/ConversationList/ConversationList";
import styles from './AdminControlPanel.module.scss';

function AdminControlPanel(props) {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    return (
        <>
            <Header>
                <img src={logo} alt="DemoDrop header logo"/>
                <h1>Admin Control panel</h1>
                <h2>Welcome, {user.username} </h2>
            </Header>
            <main>
                <section className="outer-content-container">
                    <div className="inner-content-container">
                        <h2>Latest users:</h2>
                        <UserList mode='all' limit={6} />
                        <button
                            type="button"
                            onClick={() => navigate('/admin/users')}
                        >s
                            User Control Panel
                        </button>
                    </div>
                </section>
                <section className="outer-content-container">
                    <div className="inner-content-container">
                        <h2>Latest demos:</h2>
                        <DemoList mode='all' limit={6}/>
                        <button
                            type="button"
                            onClick={() => navigate('/admin/demos')}
                        >
                            Demo Control Panel
                        </button>
                    </div>
                </section>
                <section className="outer-content-container">
                    <div className="inner-content-container">
                        <h2>Latest conversations:</h2>
                        <ConversationList mode='all' limit={6}/>
                        <button
                            type="button"
                            onClick={() => navigate('/admin/conversations')}
                        >
                            Conversation Control Panel
                        </button>
                    </div>
                </section>
            </main>
        </>

    );
}

export default AdminControlPanel;