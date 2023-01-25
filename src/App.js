import React, {useContext} from 'react';
import HomePage from './pages/HomePage/HomePage';
import {Navigate, Route, Routes} from "react-router-dom";
import Profile from './pages/Profile/Profile';
import LogIn from './pages/LogIn/LogIn';
import Register from './pages/Register/Register';
import {AuthContext} from './context/AuthContext';
import './App.css';
import DemoDetails from "./pages/DemoDetails/DemoDetails";
import DemoList from "./pages/DemoList/DemoList";
import DemoForm from "./pages/DemoForm/DemoForm";
import ConversationList from "./pages/ConversationList/ConversationList";

function App() {
    const {isAuth} = useContext(AuthContext);
    return (
        <>
            <div className="content">
                <Routes>
                    <Route exact path="/" element={<HomePage/>}/>
                    <Route path="/demos" element={<DemoList/>}/>
                    <Route path="/demos/drop" element={<DemoForm mode='create'/>}/> {/* LET OP. Later auth aanzetten op deze route*/}
                    <Route path="/demos/drop/:id" element={<DemoForm mode='update'/>}/> {/* LET OP. Later auth aanzetten op deze route*/}
                    <Route path="/users/**/conversations" element={<ConversationList mode='update'/>}/> {/* LET OP. Later auth aanzetten op deze route*/}
                    <Route path="/demos/:id" element={<DemoDetails/>}/>
                    <Route path="/profile" element={isAuth ? <Profile/> : <Navigate to="/"/>}/> {/* LET OP: auth werkt nog niet tot aansluiting front end en back end*/}
                    <Route path="/login" element={<LogIn/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </div>
            <footer className="outer-content-container">
                <div className="inner-content-container">
                    In opdracht van NOVI Hogeschool © 2023
                </div>
            </footer>
        </>
    );
}

export default App;
