import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import CompanyList from "../companies/CompanyList";
import JobList from "../jobs/JobList";
import CompanyDetails from "../companies/CompanyDetails";

function Routes({ login, singup }){

    return(
        <div>
            <Swi>
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
            </Swi>
        </div>
    )
}