import React, {useContext} from 'react';
import HomePage from './pages/otherPages/HomePage/HomePage';
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import UserDetailsPage from './pages/detailPages/UserDetailsPage/UserDetailsPage';
import UserLogInPage from './pages/otherPages/UserLogInPage/UserLogInPage';
import UserCreatePage from './pages/createPages/UserCeatePage/UserCreatePage';
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
                <Route exact path="/genres" element={<GenreListPage mode='anon' limit={0}/>}/>
                <Route exact path="/demos4all" element={<DemoListPage mode='anon'/>}/>
                <Route exact path="/demos" element={isAuth? <DemoListPage mode='user' /> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/demos/bygenre" element={<DemoListPage mode='genre'/>}/>
                <Route exact path="/demos/drop" element={isAuth ? <DemoCreatePage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/demos/:demoId/edit" element={isAuth ? <DemoEditPage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/profile" element={isAuth ? <UserDetailsPage mode='personal'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/myprofile" element={isAuth ? <UserDetailsPage mode='owner'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/demos" element={isAuth ? <DemoListPage mode='personal'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/mydemos" element={isAuth ? <DemoListPage mode='owner'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/demos/:demoId" element={isAuth ? <DemoDetailsPage mode='personal'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/mydemos/:demoId" element={isAuth ? <DemoDetailsPage mode='owner'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/myconversations" element={isAuth ? <ConversationListPage mode='owner' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/favdemos" element={isAuth ? <DemoListPage mode='fav'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/change-password" element={isAuth ? <UserChangePasswordPage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/change-email" element={isAuth ? <UserChangeEmailPage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/demos/:demoId" element={<DemoDetailsPage mode='anon'/>}/>
                <Route exact path="/login" element={isAuth ? <Navigate to={`/users/${user.username}/myprofile`}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/register" element={<UserCreatePage mode='anon'/>}/>
                <Route exact path="/conversations/:conversationId" element={isAuth ? <ConversationDetailsPage mode='user'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/demos/:demoId/inquire" element={isAuth ? <ConversationCreatePage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/conversations/:conversationId/reply" element={isAuth ? <ConversationEditPage/> : <UserLogInPage redirect={currenLocation}/>}/>

                {/*ADMIN ROUTES*/}
                <Route exact path="/admin" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <AdminControlPanel/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/users" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <UserControlPanel mode='admin' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/newuser" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <UserCreatePage mode='admin'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/newadmin" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <UserCreatePage mode='newadmin'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/demos" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <DemoListPage mode='admin'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/conversations" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <ConversationListPage mode='admin' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/audiofiles" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <AudioFileListPage mode='admin' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/genres" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <GenreListPage mode='admin' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/users/:username" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <UserDetailsPage mode='admin'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/demos/:demoId" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <DemoDetailsPage mode='admin'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/conversations/:conversationId" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <ConversationDetailsPage mode='admin' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/audioFiles/:audioFileId" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <AudioFileDetailsPage mode='admin'/> : <UserLogInPage redirect={currenLocation}/>}/>

                {/*MISC*/}
                <Route exact path= "/request-error" element={<HttpErrorPage redirect={currenLocation}/>}/>
                <Route exact path= "/error" element={<ErrorPage redirect={currenLocation}/>}/>
                <Route path= "*" element={<PageNotFoundPage/>}/>
            </Routes>
        </>
    );
}

export default App;
