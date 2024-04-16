import "./style/App.css";
import Auth from "./components/Auth";
import Todolist from "./Todolist";
import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth } from "./firebase/BaseConfig";
import { onAuthStateChanged, type User } from "firebase/auth";
import AuthProvider from './AuthContext';

type UserType = User | null;

export default function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path={`/`} element={<Auth />} />
        <Route path={`/todolist`} element={<Todolist />} />
      </Routes>
    </AuthProvider>
  )
  // const [user, setUser] = useState<UserType>(null);

  // useEffect(() => {
  //   //function that firebase notifies you if a user is set
  //   const unsubsrcibe = onAuthStateChanged(auth, (user) => {
  //     setUser(user)
  //     console.log(user)
  //   })
  //   return unsubsrcibe
  // }, [])
  // return (
  //   <>{user ? <Todolist /> : <Auth />}</>
  // )

  // return (
  //   <Routes>
  //     <Route path={`/`} element={<Auth />} />
  //     <Route path={`/todolist`} element={<Todolist />} />
  //   </Routes>
  // );
}
