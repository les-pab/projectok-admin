import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const AuthReroute = ({ children, ...rest }) => {
    const auth = useAuth();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user.isLoggedIn ? (
                    children
                ) : (
                    <Redirect
                        to={{ pathname: "/", state: { from: location } }}
                    />
                )
            }
        />
    );
};

export default AuthReroute;
