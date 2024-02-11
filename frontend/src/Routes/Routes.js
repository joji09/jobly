import React from "react";
import { Switch, Route, Redirect, Routes } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import CompanyList from "../companies/CompanyList";
import JobList from "../jobs/JobList";
import CompanyDetails from "../companies/CompanyDetails";
import LoginForm from "../auth/LoginForm";
import SingupForm from "../auth/SingUpForm";

function RoutesNav({ login, singup }){

    return(
        <div>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <PrivateRoute path="/companies" element={<CompanyList />} />
                <PrivateRoute path="/companies/:handle" element={<CompanyDetails />} />
                <PrivateRoute path="/jobs" element={<JobList />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/singup" element={<SingupForm />} />

                <Redirect path="/" />
            </Routes>
        </div>
    )
}

export default RoutesNav;