import jwt_decode from "jwt-decode";
import React, {createContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuth: false,
    user: null,
    status: 'pending'
  });
  const navigate = useNavigate();

  function getUnixTimeCode () {
    return  Date.now();
  }

  useEffect( () => {
    // Retrieve JWT from local storage
    const storedToken = localStorage.getItem( 'token' )
    // When a JWT exists, retrive user data (again)
    if ( storedToken ) {
      const decodedToken = jwt_decode( storedToken )
      if (storedToken && (getUnixTimeCode() < decodedToken.exp * 1000)) {
        console.log( "The user is STILL logged in 🔓." )
        void fetchUserData( storedToken, decodedToken.sub )
      } else  {
        console.log( "The JSON Web Token has expired." )
        localStorage.removeItem( 'token' )
      }
    } else {
      // Wehn there is no JWT, we do nothing
      setAuth( {
        ...auth,
        isAuth: false,
        user: null,
        status: "done"
      } )
    }
  }, [] )

  function login( jwt ) {
    console.log( "Thus user has been logged in 🔓." )
    localStorage.setItem('token', jwt);
    const decodedToken = jwt_decode(jwt);
    void fetchUserData(jwt, decodedToken.sub, "/profile");
  }

  async function fetchUserData(token, id, redirect){
    try {
      const response =await axios.get(`http://localhost:3000/600/users/${id}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      })
      console.log(response);
      setAuth({
        ...auth,
        isAuth: true,
        user: {
          email: response.data.email,
          id: response.data.id,
          username: response.data.username
        },
        status: 'done'
      });
      if (redirect) {
        navigate(redirect);
      }
    }
    catch (e) {
      console.error(e);
      setAuth({
          ...auth,
          status: 'done'
      })
    }
  }

  function logout() {
    console.log( " The user has been logged out 🔒." )
    localStorage.removeItem( 'token' )
    setAuth( {
      ...auth,
      isAuth: false,
      user: null,
      status: "done"
    } )
    navigate( "/" )
  }

  const contextData = {
    // TODO: spread operator hier nog gebruiken!!!!! ...auth,
    isAuth: auth.isAuth,
    user: auth.user,
    status: auth.status,
    login: login,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {auth.status ==="done" ? children : <p>Loading...</p>}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;