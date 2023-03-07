import React, {useContext} from 'react';
import HomePage from './pages/HomePage/HomePage';
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import UserDetailsPage from './pages/UserDetailsPage/UserDetailsPage';
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
import AudioFileListPage from "./pages/AudioFileListPage/AudioFileListPage";
import AudioFileDetailsPage from "./pages/AudioFileDetailsPage/AudioFileDetailsPage";
import DemoDetails from "./components/DemoDetails/DemoDetails";
import PageNotFoundPage from "./pages/PageNotFoundPage/PageNotFoundPage";
import HttpErrorPage from "./pages/HttpErrorPage/HttpErrorPage";

function App() {
    const location = useLocation();
    console.log(location);
    const currenLocation = location.pathname;
    const {isAuth, user} = useContext(AuthContext);

    // console.log('isAuth: ',isAuth)
    // console.log('user: ',user)

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
                <Route exact path="/demos" element={isAuth? <DemoListPage mode='anon' limit={0}/> : <DemoListPage mode='anon' limit={100}/> }/>
                <Route exact path="/demos/drop" element={isAuth ? <DemoCreatePage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/demos/:demoId/edit" element={isAuth ? <DemoEditPage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/profile" element={isAuth ? <UserDetailsPage mode='anon'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/myprofile" element={isAuth ? <UserDetailsPage mode='personal'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/demos" element={isAuth ? <DemoListPage mode='personal' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/demos/:demoId" element={isAuth ? <DemoDetailsPage mode='personal' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/conversations" element={isAuth ? <ConversationListPage mode='personal' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/favdemos" element={isAuth ? <DemoListPage mode='fav' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/change-password" element={isAuth ? <UserChangePasswordPage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/users/:username/change-email" element={isAuth ? <UserChangeEmailPage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/demos/:demoId" element={<DemoDetailsPage mode='anon'/>}/>
                <Route exact path="/login" element={isAuth ? <Navigate to={`/users/${user.username}/profile`}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/register" element={<UserRegisterPage/>}/>
                <Route exact path="/conversations/:conversationId" element={isAuth ? <ConversationDetailsPage mode='user'/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/demos/:demoId/inquire" element={isAuth ? <ConversationCreatePage/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/conversations/:conversationId/reply" element={isAuth ? <ConversationEditPage/> : <UserLogInPage redirect={currenLocation}/>}/>

                {/*ADMIN ROUTES*/}
                <Route exact path="/admin" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <AdminControlPanel/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/users" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <UserListPage mode='admin' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/demos" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <DemoListPage mode='admin' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/conversations" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <ConversationListPage mode='admin' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/audiofiles" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <AudioFileListPage mode='admin' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/genres" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <GenreListPage mode='admin' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/users/:username" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <UserDetailsPage mode='admin' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/demos/:demoId" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <DemoDetailsPage mode='admin' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/conversations/:conversationId" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <ConversationDetailsPage mode='admin' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>
                <Route exact path="/admin/audioFiles/:audioFileId" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <AudioFileDetailsPage mode='admin' limit={0}/> : <UserLogInPage redirect={currenLocation}/>}/>

                {/*MISC*/}
                <Route exact path= "/request-error" element={<HttpErrorPage redirect={currenLocation}/>}/>
                <Route path= "*" element={<PageNotFoundPage/>}/>
            </Routes>
        </>
    );
}

export default App;
