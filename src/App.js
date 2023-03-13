import React, {useContext} from 'react';
import HomePage from './pages/otherPages/HomePage/HomePage';
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import UserDetailsPage from './pages/detailPages/UserDetailsPage/UserDetailsPage';
import UserLogInPage from './pages/otherPages/UserLogInPage/UserLogInPage';
import UserCreatePage from './pages/formPages/UserFormPage/UserFormPage';
import {AuthContext} from './context/AuthContext';
import './App.css';
import DemoListPage from "./pages/listPages/DemoListPage/DemoListPage";
import DemoCreatePage from "./pages/createPages/DemoCreatePage/DemoCreatePage";
import ConversationListPage from "./pages/listPages/ConversationListPage/ConversationListPage";
import AdminControlPanel from "./pages/adminPages/AdminControlPanel/AdminControlPanel";
import UserListPage from "./pages/listPages/UserListPage/UserListPage";
import ConversationDetailsPage from "./pages/detailPages/ConversationDetailsPage/ConversationDetailsPage";
import UserChangePasswordPage from "./pages/otherPages/UserChangePasswordPage/UserChangePasswordPage";
import ConversationEditPage from "./pages/editPages/ConversationEditPage/ConversationEditPage";
import ConversationCreatePage from "./pages/createPages/ConversationCreatePage/ConversationCreatePage";
import DemoEditPage from "./pages/editPages/DemoEditPage/DemoEditPage";
import UserChangeEmailPage from "./pages/otherPages/UserChangeEmailPage/UserChangeEmailPage";
import GenreListPage from "./pages/listPages/GenreListPage/GenreListPage";
import AudioFileListPage from "./pages/listPages/AudioFileListPage/AudioFileListPage";
import AudioFileDetailsPage from "./pages/detailPages/AudioFileDetailsPage/AudioFileDetailsPage";
import PageNotFoundPage from "./pages/errorPages/PageNotFoundPage/PageNotFoundPage";
import HttpErrorPage from "./pages/errorPages/HttpErrorPage/HttpErrorPage";
import DemoDetailsPage from "./pages/detailPages/DemoDetailsPage/DemoDetailsPage";
import ErrorPage from "./pages/errorPages/ErrorPage/ErrorPage";
import UserControlPanel from "./pages/adminPages/UserConrolPanel/UserControlPanel";
import UserFormPage from "./pages/formPages/UserFormPage/UserFormPage";
import AudioFileFormPage from "./pages/formPages/AudioFileFormPage/AudioFileFormPage";
import GenreFormPage from "./pages/formPages/GenreFormPage/GenreFormPage";
import GenreDetailsPage from "./pages/detailPages/GereDetailsPage/GenreDetailsPage";
import DemoControlPanel from "./pages/adminPages/DemoControlPanel/DemoControlPanel";
import * as PropTypes from "prop-types";
import AudioFileControlPanel from "./pages/adminPages/AudioFileControlPanel/AudioFileControlPanel";
import GenreControlPanel from "./pages/adminPages/GenreControl Panel/GenreControlPanel";
import ConversationControlPanel from "./pages/adminPages/ConversationControlPanel/ConversationControlPanel";

function App() {
    const location = useLocation();
    console.log(location);
    const currenLocation = location.pathname;
    const {isAuth, user} = useContext(AuthContext);

    let roles = null
    if (isAuth){
        roles = user.authorities.map ((authority) =>{
            return authority.authority;
        })
    }

    return (
        <>
            <Routes>
                {/*USER ROUTES*/}
                <Route exact path="/" element={<HomePage/>}/>
                <Route exact path="/register" element={<UserCreatePage mode='anon'/>}/>
                <Route exact path="/login" element={isAuth ? <Navigate to={`/users/${user.username}/myprofile`}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/genres" element={<GenreListPage mode='anon'/>}/>
                <Route exact path="/demos" element={isAuth? <DemoListPage mode='user' /> : <DemoListPage mode='anon'/>}/>
                <Route exact path="/demos/bygenre" element={<DemoListPage mode='genre'/>}/>
                <Route exact path="/demos/drop" element={isAuth ? <DemoCreatePage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/demos/:demoId/edit" element={isAuth ? <DemoEditPage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/profile" element={isAuth ? <UserDetailsPage mode='personal'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/myprofile" element={isAuth ? <UserDetailsPage mode='owner'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/demos" element={isAuth ? <DemoListPage mode='personal'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/mydemos" element={isAuth ? <DemoListPage mode='owner'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/demos/:demoId" element={isAuth ? <DemoDetailsPage mode='personal'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/mydemos/:demoId" element={isAuth ? <DemoDetailsPage mode='owner'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/myconversations" element={isAuth ? <ConversationListPage mode='owner'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/favdemos" element={isAuth ? <DemoListPage mode='fav'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/change-password" element={isAuth ? <UserChangePasswordPage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/change-email" element={isAuth ? <UserChangeEmailPage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/demos/:demoId" element={<DemoDetailsPage mode='anon'/>}/>
                <Route exact path="/conversations/:conversationId" element={isAuth ? <ConversationDetailsPage mode='owner'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/demos/:demoId/inquire" element={isAuth ? <ConversationCreatePage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/conversations/:conversationId/reply" element={isAuth ? <ConversationEditPage/> : <UserLogInPage redirect={currenLocation}/>}/>

                {/*ADMIN ROUTES*/}
                <Route exact path="/admin" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <AdminControlPanel/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/users" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <UserControlPanel mode='admin'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/users/createuser" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <UserFormPage mode='admin' type='create'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/users/createadmin" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <UserFormPage mode='admin' type='createadmin'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/users/:username" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <UserDetailsPage mode='admin'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/users/:username/edit" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <UserFormPage mode='admin' type='update'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/demos" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <DemoControlPanel mode='admin'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/demos/create" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <DemoCreatePage mode='admin'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/demos/:demoId" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <DemoDetailsPage mode='admin'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/demos/:demoId/edit" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <DemoEditPage mode='admin'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/demos/:demoId/sendmessage" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <ConversationCreatePage mode='admin'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/conversations" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <ConversationControlPanel mode='admin'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/conversations/:conversationId" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <ConversationDetailsPage mode='admin'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/conversations/:conversationId/edit" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <ConversationEditPage mode='admin'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/audiofiles" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <AudioFileControlPanel mode='admin'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/audiofiles/create" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <AudioFileFormPage mode='admin' type='create'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/audiofiles/:audioFileId" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <AudioFileDetailsPage mode='admin'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/audiofiles/:audioFileId/edit" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <AudioFileFormPage mode='admin' type='update'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/genres" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <GenreControlPanel mode='admin'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/genres/create" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <GenreFormPage mode='admin' type='create'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/genres/:genreName" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <GenreDetailsPage mode='admin'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/genres/:genreName/edit" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <GenreFormPage mode='admin' type='update'/> : <UserLogInPage redirect={currenLocation}/>}/>

                {/*MISC*/}
                <Route exact path= "/request-error" element={<HttpErrorPage redirect={currenLocation}/>}/>
                <Route exact path= "/error" element={<ErrorPage redirect={currenLocation}/>}/>
                <Route path= "*" element={<PageNotFoundPage/>}/>
            </Routes>
        </>
    );
}

export default App;
