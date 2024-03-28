import React, { Fragment, useState } from "react";
import { auth } from "../firebase/BaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";

export default function Auth() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState(true);

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };
  const navigate = useNavigate();
  function signUp(e: any) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        navigate("/todo"); // 登録成功後のリダイレクトページを設定してください。
      })
      .catch((error) => {
        // alert(error.message);
        console.error(error.message);
      });
  }

  function logIn(e: any) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        navigate("/todo"); // 登録成功後のリダイレクトページを設定してください。

        // Signed in
        // const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        console.error(error.message);

        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
  }
  return (
    <>
      <div>
        <h3>{isLogin ? "Create new account" : "Login"}</h3>
        <Input
          style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
          name="email"
          label="E-mail"
          variant="outlined"
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeEmail(event);
          }}
        />
        <Input
          style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleChangePassword(event);
          }}
        />
        <Button
          style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
          onClick={isLogin ? signUp : logIn}
        >
          {isLogin ? "Sign up" : "Login"}
        </Button>
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Login?" : "Create new account?"}
        </span>
      </div>
    </>
  );
}
