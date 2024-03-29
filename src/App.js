import React, {useContext} from 'react';
import HomePage from './pages/otherPages/HomePage/HomePage';
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import UserDetailsPage from './pages/detailPages/UserDetailsPage/UserDetailsPage';
import UserLogInPage from './pages/otherPages/UserLogInPage/UserLogInPage';
import {AuthContext} from './context/AuthContext';
import './App.css';
import DemoListPage from "./pages/listPages/DemoListPage/DemoListPage";
import ConversationListPage from "./pages/listPages/ConversationListPage/ConversationListPage";
import AdminControlPanel from "./pages/adminPages/AdminControlPanel/AdminControlPanel";
import ConversationDetailsPage from "./pages/detailPages/ConversationDetailsPage/ConversationDetailsPage";
import UserChangePasswordPage from "./pages/otherPages/UserChangePasswordPage/UserChangePasswordPage";
import UserChangeEmailPage from "./pages/otherPages/UserChangeEmailPage/UserChangeEmailPage";
import GenreListPage from "./pages/listPages/GenreListPage/GenreListPage";
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
import AudioFileControlPanel from "./pages/adminPages/AudioFileControlPanel/AudioFileControlPanel";
import GenreControlPanel from "./pages/adminPages/GenreControl Panel/GenreControlPanel";
import ConversationControlPanel from "./pages/adminPages/ConversationControlPanel/ConversationControlPanel";
import ConversationFormPage from "./pages/formPages/ConversationFormPage/ConversationFormPage";
import DemoFormPage from "./pages/formPages/DemoFormPage/DemoFormPage";
import GoodbyePage from "./pages/otherPages/GoodbyePage/GoodbyePage";
import UserReportControlPanel from "./pages/adminPages/UserReportControlPanel/UserReportControlPanel";
import UserReportDetailsPage from "./pages/detailPages/UserReportDetailsPage/UserReportDetailsPage";
import UserReportFormPage from "./pages/formPages/UserReportFormPage/UserReportFormPage";

function App() {
    const location = useLocation();
    console.log(location);
    const currentLocation = location.pathname;
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
                <Route exact path="/register" element={<UserFormPage mode='anon' type="create"/>}/>
                <Route exact path="/login" element={isAuth ? <Navigate to={`/users/${user.username}/myprofile`}/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/genres" element={<GenreListPage mode='anon'/>}/>
                <Route exact path="/demos" element={isAuth? <DemoListPage mode='user' /> : <DemoListPage mode='anon'/>}/>
                <Route exact path="/demos/bygenre" element={<DemoListPage mode='genre'/>}/>
                <Route exact path="/demos/find" element={<DemoListPage mode='query'/>}/>
                <Route exact path="/demos/drop" element={isAuth ? <DemoFormPage type="create" /> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/demos/:demoId/edit" element={isAuth ? <DemoFormPage type="update"/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/users/:username/profile" element={isAuth ? <UserDetailsPage mode='personal'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/users/:username/myprofile" element={isAuth ? <UserDetailsPage mode='owner'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/users/:username/demos" element={isAuth ? <DemoListPage mode='personal'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/users/:username/mydemos" element={isAuth ? <DemoListPage mode='owner'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/users/:username/demos/:demoId" element={isAuth ? <DemoDetailsPage mode='personal'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/users/:username/mydemos/:demoId" element={isAuth ? <DemoDetailsPage mode='owner'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/users/:username/myconversations" element={isAuth ? <ConversationListPage mode='owner'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/users/:username/favdemos" element={isAuth ? <DemoListPage mode='fav'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/users/:username/change-password" element={isAuth ? <UserChangePasswordPage/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/users/:username/change-email" element={isAuth ? <UserChangeEmailPage/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/users/:username/report" element={isAuth ? <UserReportFormPage mode='owner' type='user'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/demos/:demoId" element={<DemoDetailsPage mode='anon'/>}/>
                <Route exact path="/demos/:demoId/inquire" element={isAuth ? <ConversationFormPage type="create"/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/demos/:demoId/report" element={isAuth ? <UserReportFormPage mode='owner' type='demo'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/conversations/:conversationId" element={isAuth ? <ConversationDetailsPage mode='owner'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/conversations/:conversationId/reply" element={isAuth ? <ConversationFormPage type="update" /> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/conversations/:conversationId/report" element={isAuth ? <UserReportFormPage mode='owner' type='conversation'/> : <UserLogInPage redirect={currentLocation}/>}/>


                {/*ADMIN ROUTES*/}
                <Route exact path="/admin" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <AdminControlPanel/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/admin/users" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <UserControlPanel mode='admin'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/admin/users/createuser" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <UserFormPage mode='admin' type='create'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/admin/users/createadmin" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <UserFormPage mode='admin' type='createadmin'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/admin/users/:username" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <UserDetailsPage mode='admin'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/admin/users/:username/edit" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <UserFormPage mode='admin' type='update'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/admin/users/:username/sendmessage" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <ConversationFormPage mode='admin' type="create"/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/admin/demos" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <DemoControlPanel mode='admin'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/admin/demos/create" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <DemoFormPage mode='admin' type="create"/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/admin/demos/:demoId" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <DemoDetailsPage mode='admin'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/admin/demos/:demoId/edit" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <DemoFormPage mode='admin' type="update"/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/admin/demos/:demoId/sendmessage" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <ConversationFormPage mode='admin' type="create"/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/admin/conversations" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <ConversationControlPanel mode='admin'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/admin/conversations/:conversationId" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <ConversationDetailsPage mode='admin'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/admin/conversations/:conversationId/edit" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <ConversationFormPage mode='admin' type="update" /> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/admin/audiofiles" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <AudioFileControlPanel mode='admin'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/admin/audiofiles/create" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <AudioFileFormPage mode='admin' type='create'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/admin/audiofiles/:audioFileId" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <AudioFileDetailsPage mode='admin'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/admin/audiofiles/:audioFileId/edit" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <AudioFileFormPage mode='admin' type='update'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/admin/genres" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <GenreControlPanel mode='admin'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/admin/genres/create" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <GenreFormPage mode='admin' type='create'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/admin/genres/:genreName" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <GenreDetailsPage mode='admin'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/admin/genres/:genreName/edit" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <GenreFormPage mode='admin' type='update'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/admin/userreports" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <UserReportControlPanel mode='admin'/> : <UserLogInPage redirect={currentLocation}/>}/>
                <Route exact path="/admin/userreports/:userReportId" element={(isAuth && (roles.includes("ROLE_ADMIN"))) ? <UserReportDetailsPage mode='admin'/> : <UserLogInPage redirect={currentLocation}/>}/>

                {/*MISC*/}
                <Route exact path= "/request-error" element={<HttpErrorPage redirect={currentLocation}/>}/>
                <Route exact path= "/error" element={<ErrorPage redirect={currentLocation}/>}/>
                <Route exact path= "/byebye" element={<GoodbyePage redirect={currentLocation}/>}/>
                <Route path= "*" element={<PageNotFoundPage/>}/>
            </Routes>
        </>
    );
}

export default App;
