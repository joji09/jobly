import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Routes/Navigation";
import JoblyApi from "./api.js"
import logo from './logo.svg';
import './App.css';
import RoutesNav from "./Routes/Routes";

export const TOKEN_STORAGE_ID = "jobly-token";

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  return (
    <BrowserRouter>
    <div>
    <Navigation />
    <RoutesNav />
    </div>
    </BrowserRouter>
  );
}

export default App;
