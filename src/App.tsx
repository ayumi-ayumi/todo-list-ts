import "./style/App.css";
import Auth from "./components/Auth";
import Todolist from "./Todolist";
import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "./firebase/BaseConfig";
import { onAuthStateChanged, type User } from "firebase/auth";
import AuthProvider, { authContext } from './AuthContext';

type UserType = User | null;

export default function App() {
  const { currentUser } = useContext<UserType>(authContext);
  const navigate = useNavigate()

  console.log('User:', !!currentUser);
  console.log(currentUser &&  "user");

  useEffect(() => {
    if (currentUser) {
      navigate('/todolist')
    }
  }, [currentUser])

  return (
    <AuthProvider>
      <Routes>
        <Route path={`/`} element={<Auth />} />
        {/* <Route path={`/todolist`} element={<Todolist />} /> */}
        <Route path={`/todolist`} element={currentUser ? <Todolist />: <Auth />} />
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
