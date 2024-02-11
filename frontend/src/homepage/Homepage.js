import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";

function Homepage(){
    const { currentUser } = useContext(UserContext);
    console.log(currentUser);

    return (
        <div>
            <h1>Jobly</h1>
            {currentUser ?
            <h2>Welcome back, {currentUser.firstName || currentUser.username}!</h2>
            :(
                <p>
                    <Link to="/login">Log In</Link>
                    <Link to="/singup">Sing Up</Link>
                </p>
            )}
        </div>
    )
}

export default Homepage;