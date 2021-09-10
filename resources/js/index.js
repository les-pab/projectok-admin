import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "./material-ui/styles";
import App from "./components/App";

const index = () => {
    return <App />;
};

export default index;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
