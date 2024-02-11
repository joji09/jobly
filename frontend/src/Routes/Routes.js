import React from "react";
import { Route, Routes } from "react-router-dom";
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
                <Route path="/companies" element={<CompanyList />} />
                <Route path="/companies/:handle" element={<CompanyDetails />} />
                <Route path="/jobs" element={<JobList />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/singup" element={<SingupForm />} />
            </Routes>
        </div>
    )
}

export default RoutesNav;