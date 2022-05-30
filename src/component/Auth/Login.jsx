import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
// import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// import { auth } from "../../firebase";
import { useForm } from "react-hook-form";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserAction } from "../../reducer/userSlice";
import BackDrop from "../Loading/BackDrop";

const theme = createTheme();

export default function Login() {
  const { errorLogin, loading } = useSelector((state) => state.currentUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitLogin = (data) => {
    dispatch(getCurrentUserAction(data));
    // signInWithEmailAndPassword(auth, data.email, data.password)
    //   .then((userCredential) => {
    //     const user = userCredential.user;
    //     // console.log(user);
    //     dispatch(
    //       getCurrentUserAction({
    //         email: user.email,
    //         uid: user.uid,
    //       })
    //     );

    //     navigate("/");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     alert("Wrong email or password");
    //   });
  };

  return (
    <ThemeProvider theme={theme}>
      <BackDrop load={loading} />
      <ContainerStyle component="main" sx={{ width: "500px" }}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "60px 20px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit(onSubmitLogin)}>
            <TextField
              {...register("email", {
                required: true,
                maxLength: {
                  value: 20,
                  message: "Please enter less than 20 characters.",
                },
              })}
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
            />
            {errors?.email?.type === "required" ? (
              <ErrorMessage>This field is required.</ErrorMessage>
            ) : (
              <ErrorMessage>{errors?.name?.message}</ErrorMessage>
            )}
            <TextField
              {...register("password", {
                required: true,
                maxLength: {
                  value: 20,
                  message: "Please enter less than 20 characters.",
                },
              })}
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
            />
            {errors?.password?.type === "required" ? (
              <ErrorMessage>This field is required.</ErrorMessage>
            ) : (
              <ErrorMessage>{errors?.password?.message}</ErrorMessage>
            )}
            {errorLogin && (
              <ErrorMessage>Wrong email or password!</ErrorMessage>
            )}

            <FormControlLabel
              sx={{ display: "block" }}
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
                <Link onClick={() => navigate("/register")} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </ContainerStyle>
    </ThemeProvider>
  );
}

const ContainerStyle = styled(Container)`
  margin-top: 80px;
  background: rgba(255, 255, 255, 1);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid #91d5ff;
`;

const ErrorMessage = styled.span`
  color: red;
`;
