import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { theme } from "../material-ui/styles";
import { AuthProvider } from "./auth/AuthProvider";
import AuthReroute from "./auth/AuthReroute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Index from "./landing/Index";
import Ched from "./ched/Ched";

const AppRoute = () => {
    return (
        <>
            <Switch>
                <Route exact path="/">
                    <Index />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/ched/admin/create">
                    <Register />
                </Route>
                <AuthReroute path="/ched/admin">
                    <Ched />
                </AuthReroute>
                {/* 
                <AuthReroute path="/admin">
                    <UnivAdmin />
                </AuthReroute> */}
            </Switch>
        </>
    );
};

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <Router>
                    <AppRoute />
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
