import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import App from "./App";

export default function AuthContext() {
  return (
    <Routes>
      <Route path={`/`} element={<Auth />} />
      <Route path={`/app`} element={<App />} />
    </Routes>
  );
}
