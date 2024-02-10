import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navigation( {logout }){
 
    return(
        <nav>
            <NavLink to="/companies">
            Companies
            </NavLink>
            <NavLink to="/jobs">
                Jobs
            </NavLink>
            <NavLink to="/profile">
                Profile
            </NavLink>
            <Link to="/">
                Jobly
            </Link>
        </nav>
    );
}

export default Navigation;