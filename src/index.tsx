import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { defaultTheme, Provider as Pro } from "@adobe/react-spectrum";
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <Pro theme={defaultTheme}>
                    <App />
                </Pro>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
