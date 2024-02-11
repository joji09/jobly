import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";

function Navigation( {logout }){
    const { currentUser } = useContext(UserContext);
    function loggedInNav(){
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <NavLink to="/companies">Companies</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/jobs">Jobs</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/profile">Profile</NavLink>
                </li>
                <li className="nav-item">
                    <Link to="/" onClick={logout}>Logout {currentUser.username || currentUser.first_name}</Link>
                </li>
            </ul>
        );
    }

    function loggedOutNav(){
        return (
            <ul>
                <li>
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" to="/singup">Sing Up</NavLink>
                </li>
            </ul>
        );
    }

    return(
        <nav>
            <Link to="/">
                Jobly
            </Link>
            {currentUser ? loggedInNav() : loggedOutNav()}
        </nav>
    );
}

export default Navigation;