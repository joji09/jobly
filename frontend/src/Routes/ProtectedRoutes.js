import React from "react";
import { Route, Navigate } from "react-router-dom";
import UserContext from "../auth/UserContext";

function ProtectedRoute({ exact, path, children }){
    const { currentUser } = UserContext(UserContext);

    if(!currentUser){
        return <Navigate to="/login" />;
    }

    return (
        <Route exact={exact} path={path}>
            {children}
        </Route>
    );
}

export default ProtectedRoute;