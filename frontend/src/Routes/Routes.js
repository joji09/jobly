import React from "react";
import { Switch, Route, Redirect, Routes } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import CompanyList from "../companies/CompanyList";
import JobList from "../jobs/JobList";
import CompanyDetails from "../companies/CompanyDetails";

function RoutesNav({ login, singup }){

    return(
        <div>
            {/* <Routes>
            <Route exact path="/">
                    <Homepage />
                </Route>

                <Route path="/companies">
                    <CompanyList />
                </Route>

                <Route path="/companies/:handle">
                    <CompanyDetails />
                </Route>

                <Route path="/jobs">
                    <JobList />
                </Route>

                <Route path="/profile">
                    <JobList />
                </Route>
            </Routes> */}

            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/companies" element={<CompanyList />} />
                <Route path="/companies/:handle" element={<CompanyDetails />} />
                <Route path="/jobs" element={<JobList />} />
                <Route path="/profile" element={<JobList />} />
            </Routes>
        </div>
    )
}

export default RoutesNav;