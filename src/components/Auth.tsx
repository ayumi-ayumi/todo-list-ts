import React, { useState } from "react";
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


export default function Auth() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

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
        updateProfile(userCredential.user, {
        displayName: "Ayumi",
      })
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
  //       <h3>{isLogin ? "Create new account" : "Login"}</h3>
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
  //         onClick={isLogin ? signUp : logIn}
  //       >
  //         {isLogin ? "Sign up" : "Login"}
  //       </Button>
  //       <span
  //         onClick={() => setIsLogin(!isLogin)}
  //         style={{ cursor: "pointer", margin: "0.5em" }}
  //       >
  //         {isLogin ? "Login?" : "Create new account?"}
  //       </span>
  //     </div>
  //   </>
  // );
  return (
    <>
<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={isLogin ? signUp : logIn} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
    </>
  )
}
