import React from "react";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/index";
import "./index.css";
import { MapContextProvider } from "./store/map-context";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <MapContextProvider>
                <ThemeProvider theme={darkTheme}>
                    <App />
                </ThemeProvider>
            </MapContextProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
