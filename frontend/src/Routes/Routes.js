import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import CompanyList from "../companies/CompanyList";
import JobList from "../jobs/JobList";
import CompanyDetails from "../companies/CompanyDetails";
import LoginForm from "../auth/LoginForm";
import SingupForm from "../auth/SingUpForm";
import ProtectedRoute from "./ProtectedRoutes";

function RoutesNav({ login, singup }){

    return(
        <div>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/singup" element={<SingupForm />} />
                <ProtectedRoute path="/companies" element={<CompanyList />} />
                <ProtectedRoute path="/companies/:handle" element={<CompanyDetails />} />
                <ProtectedRoute path="/jobs" element={<JobList />} />
            </Routes>
        </div>
    )
}

export default RoutesNav;