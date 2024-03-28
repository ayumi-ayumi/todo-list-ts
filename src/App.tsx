import "./style/App.css";
import Auth from "./components/Auth";
import Todolist from "./Todolist";
import { Routes, Route } from "react-router-dom";
import React from "react";

export default function App() {
  return (
    <Routes>
      <Route path={`/`} element={<Auth />} />
      <Route path={`/todo`} element={<Todolist />} />
    </Routes>
  );
}
