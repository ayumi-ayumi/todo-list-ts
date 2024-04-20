import "./style/App.css";
import Auth from "./components/Auth";
import Todolist from "./Todolist";
import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { AuthContext } from './AuthContext';
import ErrorPage from './error-page'

export default function App() {
  const {currentUser,} = useContext(AuthContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      navigate('/todolist')
    }
  }, [])

  return (
      <Routes>
        <Route path='*' element={<ErrorPage />} />
        <Route path={`/`} element={<Auth />}/>
        <Route path={`/todolist`} element={currentUser ? <Todolist /> : <Auth />} />
      </Routes>
  )
}
