// import React from "react";
// import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style/index.css";
// import '@fontsource/inter';
// import "./App.css";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import ErrorPage from "./error-page";
import AuthProvider from "./AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
