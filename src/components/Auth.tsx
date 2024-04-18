import React, { useState, useContext } from "react";
import { auth } from "../firebase/BaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
// import Button from "@mui/joy/Button";
// import Input from "@mui/joy/Input";
// import FormControl from "@mui/joy/FormControl";
// import FormLabel from "@mui/joy/FormLabel";
// import FormHelperText from "@mui/joy/FormHelperText";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { authContext } from '../AuthContext';


export default function Auth() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [haveAccout, setHaveAccout] = useState(false);
  const [error, setError] = useState("");
  const { currentUser, loading } = useContext<UserType>(authContext);


  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };
  const navigate = useNavigate();

  function signUp() {
    // e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        // updateProfile(userCredential.user, {
        //   displayName: "Ayumi",
        // })
        navigate("/todolist"); // 登録成功後のリダイレクトページを設定してください。
      })
      .catch((error) => {
        // console.error(error.message);
        setError(error.message);
      });
  }

  function logIn() {
    // function logIn(e: any) {
    // e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        navigate("/todolist"); // 登録成功後のリダイレクトページを設定してください。

        // Signed in
        // const user = userCredential.user;
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  // return (
  //   <>
  //     <div className="auth-container">
  //       <h3>{haveAccout ? "Create new account" : "Login"}</h3>
  //       <FormControl>
  //         <FormLabel>E-mail</FormLabel>

  //         <Input
  //           style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
  //           name="email"
  //           label="E-mail"
  //           variant="outlined"
  //           value={email}
  //           placeholder="abc@t.com"
  //           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
  //             handleChangeEmail(event);
  //           }}
  //         />
  //         <FormLabel>Password</FormLabel>

  //         <Input
  //           style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
  //           name="password"
  //           label="Password"
  //           variant="outlined"
  //           type="password"
  //           value={password}
  //           placeholder="password"
  //           onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
  //             handleChangePassword(event);
  //           }}
  //         />
  //         {error && (
  //           <FormHelperText style={{ color: "red" }}>
  //             E-mail address or password is wrong.
  //           </FormHelperText>
  //         )}
  //       </FormControl>
  //       {/* {error && <p style={{ color: 'red' }}>E-mail address or password is wrong.</p>} */}
  //       <Button
  //         style={{ marginTop: "0.5em", marginBottom: "0.5em" }}
  //         onClick={haveAccout ? signUp : logIn}
  //       >
  //         {haveAccout ? "Sign up" : "Login"}
  //       </Button>
  //       <span
  //         onClick={() => setHaveAccout(!haveAccout)}
  //         style={{ cursor: "pointer", margin: "0.5em" }}
  //       >
  //         {haveAccout ? "Login?" : "Create new account?"}
  //       </span>
  //     </div>
  //   </>
  // );

  const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "0 auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const btnstyle = { margin: '8px 0' }

  return (
    <>
      <Grid sx={{ pt: 3 }} >
        <Paper elevation={10} style={paperStyle}>
          <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center">
            <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
            <h2>{haveAccout ? "Sign In" : "Sign Up"}</h2>
          </Grid>
          <TextField onChange={(event: React.ChangeEvent<HTMLInputElement>) => { handleChangeEmail(event) }} label="Email Address" placeholder='Enter Email Address' variant="outlined" fullWidth required />
          <TextField onChange={(event: React.ChangeEvent<HTMLInputElement>) => { handleChangePassword(event) }} label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required />
          {error && (
            <Typography style={{ color: "red" }}>
              E-mail address or password is wrong.
            </Typography>
          )}
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
              />
            }
            label="Remember me"
          />
          <Button onClick={haveAccout ? logIn : signUp} color='primary' variant="contained" style={btnstyle} fullWidth>{haveAccout ? "Sign In" : "Sign Up"}</Button>
          {/* <Typography >
            <Link href="#" >
              Forgot password ?
            </Link>
          </Typography> */}
          <Typography > {haveAccout ? "Do you want to " : "Do you have an account ? "}
            <Link onClick={() => setHaveAccout(!haveAccout)}>
              {haveAccout ? "create new account?" : "Sign In"}
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  )
}
