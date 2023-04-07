import jwt_decode from "jwt-decode";
import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {GetRequest} from "../helpers/axiosHelper";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const navigate = useNavigate();

    function getUnixTimeCode() {
        return Date.now();
    }

    useEffect(() => {
        function initializeContext() {
            const storedToken = localStorage.getItem('token')
            if (storedToken) {
                const decodedToken = jwt_decode(storedToken)
                if (storedToken && (getUnixTimeCode() < decodedToken.exp * 1000)) {
                    console.log("The user is STILL logged in 🔓.")
                    void fetchUserData(storedToken, decodedToken.sub)
                } else {
                    console.log("The JSON Web Token has expired.")
                    localStorage.removeItem('token')
                }
            } else {
                setAuth({
                    ...auth,
                    isAuth: false,
                    user: null,
                    status: "done",
                })
            }
        }

        void initializeContext();
    }, [])

    function login(jwt, redirect) {
        localStorage.setItem('token', jwt);
        console.log("This user has been logged in 🔓.");
        const decodedToken = jwt_decode(jwt);
        console.log('decodedToken: ', decodedToken);
        void fetchUserData(jwt, decodedToken.sub, redirect);
    }

    async function fetchUserData(token, id, redirect) {
        console.log('fetchUserData redirect: ', redirect);
        console.log('window.location: ', window.location);
        if (window.location.pathname  === '/request-error') {
            setAuth({
                ...auth,
                status: 'done'
            })
        } else {
            const response = await new GetRequest(`/users/${id}/private`).invoke();
            setAuth({
                ...auth,
                isAuth: true,
                user: {
                    email: response.data.email,
                    username: response.data.username,
                    authorities: response.data.authorities
                },
                status: 'done'
            });
        }
        if (redirect) {
            navigate(redirect);
        }
    }

    function logout(redirect) {
        console.log(" The user has been logged out 🔒.")
        localStorage.removeItem('token')
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
            status: "done"
        })
        navigate(redirect);
    }

    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        status: auth.status,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;