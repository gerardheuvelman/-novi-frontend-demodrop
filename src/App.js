import React, {useContext} from 'react';
import HomePage from './pages/HomePage/HomePage';
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';
import UserLogInPage from './pages/UserLogInPage/UserLogInPage';
import UserRegisterPage from './pages/UserRegisterPage/UserRegisterPage';
import {AuthContext} from './context/AuthContext';
import './App.css';
import DemoDetailsPage from "./pages/DemoDetailsPage/DemoDetailsPage";
import DemoListPage from "./pages/DemoListPage/DemoListPage";
import DemoCreatePage from "./pages/DemoCreatePage/DemoCreatePage";
import ConversationListPage from "./pages/ConversationListPage/ConversationListPage";
import DemoDeletePage from "./pages/DemoDeletePage/DemoDeletePage";
import AdminControlPanel from "./pages/AdminControlPanel/AdminControlPanel";
import UserListPage from "./pages/UserListPage/UserListPage";
import ConversationDetailsPage from "./pages/ConversationDetailsPage/ConversationDetailsPage";
import UserChangePasswordPage from "./pages/UserChangePasswordPage/UserChangePasswordPage";
import ConversationEditPage from "./pages/ConversationEditPage/ConversationEditPage";
import ConversationCreatePage from "./pages/ConversationCreatePage/ConversationCreatePage";
import DemoEditPage from "./pages/DemoEditPage/DemoEditPage";
import UserChangeEmailPage from "./pages/UserChangeEmailPage/UserChangeEmailPage";

function App() {
    const location = useLocation();
    console.log(location);
    const currenLocation = location.pathname;
    const {isAuth, user} = useContext(AuthContext);
    return (
        <>
            <Routes>
                <Route exact path="/" element={<HomePage/>}/>
                <Route path="/demos" element={<DemoListPage mode='all' limit={0}/>}/>
                <Route path="/demos/drop" element={isAuth ? <DemoCreatePage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/demos/:demoId/edit" element={isAuth ? <DemoEditPage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/demos/delete/:demoIid" element={isAuth ? <DemoDeletePage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/users/:username/profile" element={isAuth ? <UserProfilePage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/users/:username/demos" element={isAuth ? <DemoListPage mode='personal' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/users/:username/conversations" element={isAuth ? <ConversationListPage mode='personal' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/users/:username/favdemos" element={isAuth ? <DemoListPage mode='fav' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/users/:username/change-password" element={isAuth ? <UserChangePasswordPage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/users/:username/change-email" element={isAuth ? <UserChangeEmailPage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/demos/:demoId" element={<DemoDetailsPage/>}/>
                <Route path="/login" element={isAuth ? <Navigate to={`/users/${user.username}/profile`}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/register" element={<UserRegisterPage/>}/>
                <Route path="/admin" element={(isAuth && (user.authority === "ROLE_ADMIN")) ? <AdminControlPanel/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/admin/users" element={(isAuth && (user.authority === "ROLE_ADMIN")) ? <UserListPage mode='all' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/admin/demos" element={(isAuth && (user.authority === "ROLE_ADMIN")) ? <DemoListPage mode='all' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/admin/conversations" element={(isAuth && (user.authority === "ROLE_ADMIN")) ? <ConversationListPage mode='all' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/conversations/:conversationId" element={isAuth ? <ConversationDetailsPage mode='personal'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/demos/:demoId/inquire" element={isAuth ? <ConversationCreatePage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/conversations/:conversationId/reply" element={isAuth ? <ConversationEditPage/> : <UserLogInPage redirect={currenLocation}/>}/>
            </Routes>
        </>
    );
}

export default App;
