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
import AdminControlPanel from "./pages/AdminControlPanel/AdminControlPanel";
import UserListPage from "./pages/UserListPage/UserListPage";
import ConversationDetailsPage from "./pages/ConversationDetailsPage/ConversationDetailsPage";
import UserChangePasswordPage from "./pages/UserChangePasswordPage/UserChangePasswordPage";
import ConversationEditPage from "./pages/ConversationEditPage/ConversationEditPage";
import ConversationCreatePage from "./pages/ConversationCreatePage/ConversationCreatePage";
import DemoEditPage from "./pages/DemoEditPage/DemoEditPage";
import UserChangeEmailPage from "./pages/UserChangeEmailPage/UserChangeEmailPage";
import GenreListPage from "./pages/GenreListPage/GenreListPage";

function App() {
    const location = useLocation();
    console.log(location);
    const currenLocation = location.pathname;
    const {isAuth, user} = useContext(AuthContext);

    console.log('isAuth: ',isAuth)
    console.log('user: ',user)

    let roles = null
    if (isAuth){
        roles = user.authorities.map ((authority) =>{
            return authority.authority;
        })
    }

    return (
        <>
            <Routes>
                <Route exact path="/" element={<HomePage/>}/>
                <Route path="/demos" element={isAuth? <DemoListPage mode='user' limit={0}/> : <DemoListPage mode='anon' limit={100}/> }/>
                <Route path="/demos/drop" element={isAuth ? <DemoCreatePage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/demos/:demoId/edit" element={isAuth ? <DemoEditPage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/users/:username/profile" element={isAuth ? <UserProfilePage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/users/:username/demos" element={isAuth ? <DemoListPage mode='personal' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/users/:username/conversations" element={isAuth ? <ConversationListPage mode='personal' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/users/:username/favdemos" element={isAuth ? <DemoListPage mode='fav' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/users/:username/change-password" element={isAuth ? <UserChangePasswordPage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/users/:username/change-email" element={isAuth ? <UserChangeEmailPage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/demos/:demoId" element={<DemoDetailsPage/>}/>
                <Route path="/login" element={isAuth ? <Navigate to={`/users/${user.username}/profile`}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/register" element={<UserRegisterPage/>}/>
                <Route path="/conversations/:conversationId" element={isAuth ? <ConversationDetailsPage mode='user'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/demos/:demoId/inquire" element={isAuth ? <ConversationCreatePage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/conversations/:conversationId/reply" element={isAuth ? <ConversationEditPage/> : <UserLogInPage redirect={currenLocation}/>}/>
                {/*ADMIN ROUTES*/}
                <Route path="/admin" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <AdminControlPanel/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/admin/users" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <UserListPage mode='admin' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/admin/demos" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <DemoListPage mode='admin' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/admin/conversations" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <ConversationListPage mode='admin' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/admin/genres" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <GenreListPage mode='admin' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/admin/users/:username" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <UserProfilePage mode='admin' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/admin/demos/:demoId" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <DemoDetailsPage mode='admin' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route path="/admin/conversations/:conversationId" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <ConversationDetailsPage mode='admin' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
            </Routes>
        </>
    );
}

export default App;
