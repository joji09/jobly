import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Routes/Navigation.js"
import JoblyApi from "./api.js"
import RoutesNav from "./Routes/Routes";
import UserContext from "./auth/UserContext.js";
import useLocalStorage from "./localstorage/useLocalStorage.js";
// import jwt from "jsonwebtoken";
import './App.css';
import SingupForm from "./auth/SingUpForm.js";

export const TOKEN_STORAGE_ID = "jobly-token";

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  

  useEffect(function loadUserInfo() {
    async function getCurrentUser(){
      if(token){
        try {
          let { username } = jwt.decode(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          // TODO: adding applications
        } catch (err) {
          console.error("Problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(false);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  // site logout
  function logout(){
    setCurrentUser(null);
    setToken(null);
  }

  // singup handler
  async function singup(singupData){
    try {
      let token = await JoblyApi.singup(singupData);
      setToken(token);
      return { sucess: true };
    } catch (err) {
      console.error("singup failed", err);
      return { success: false, err };
    }
  }

  // login handler
  async function login(loginData){
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (err){
      console.error("login failed", err);
      return { success: false, err};
    }
  }

  // TODO: ADD LOADING COMPONENT
  if(!infoLoaded) return <p>Can't info</p>

  return (
    <BrowserRouter>
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="app">
        <Navigation logout={logout} />
        <RoutesNav login={login} singup={singup} />
      </div>
    </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
