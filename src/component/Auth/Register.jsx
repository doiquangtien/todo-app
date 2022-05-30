import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

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
import BackDrop from "../Loading/BackDrop";
import {
  setErrorRegisterAction,
  setLoadingAction,
} from "../../reducer/userSlice";

const theme = createTheme();

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errorRegister, loading } = useSelector((state) => state.currentUser);
  const onSubmitRegister = async (data) => {
    dispatch(setLoadingAction(true));
    dispatch(setErrorRegisterAction(false));
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user_id = res.user.uid;

      await setDoc(doc(db, "users", user_id), {
        userId: user_id,
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        createAt: new Date().toISOString(),
      });
      dispatch(setLoadingAction(false));
      dispatch(setErrorRegisterAction(false));
      navigate("/login");
    } catch (err) {
      dispatch(setErrorRegisterAction(true));
      dispatch(setLoadingAction(false));
    }
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
            margin: 0,
            padding: "40px 20px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ marginBottom: "20px" }}>
            Sign up
          </Typography>
          <form onSubmit={handleSubmit(onSubmitRegister)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("firstName", {
                    required: true,
                    maxLength: {
                      value: 20,
                      message: "Please enter less than 20 characters.",
                    },
                  })}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
                {errors?.name?.type === "required" ? (
                  <ErrorMessage>This field is required.</ErrorMessage>
                ) : (
                  <ErrorMessage>{errors?.name?.message}</ErrorMessage>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("lastName", {
                    required: true,
                    maxLength: {
                      value: 20,
                      message: "Please enter less than 20 characters.",
                    },
                  })}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
                {errors?.name?.type === "required" ? (
                  <ErrorMessage>This field is required.</ErrorMessage>
                ) : (
                  <ErrorMessage>{errors?.name?.message}</ErrorMessage>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("email", {
                    required: true,
                    maxLength: {
                      value: 20,
                      message: "Please enter less than 20 characters.",
                    },
                  })}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                {errors?.name?.type === "required" ? (
                  <ErrorMessage>This field is required.</ErrorMessage>
                ) : (
                  <ErrorMessage>{errors?.name?.message}</ErrorMessage>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password", {
                    required: true,
                    maxLength: {
                      value: 20,
                      message: "Please enter less than 20 characters.",
                    },
                  })}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                {errors?.name?.type === "required" ? (
                  <ErrorMessage>This field is required.</ErrorMessage>
                ) : (
                  <ErrorMessage>{errors?.name?.message}</ErrorMessage>
                )}
              </Grid>
              <Grid item xs={12}>
                {errorRegister && (
                  <ErrorMessage>Email are already exist!</ErrorMessage>
                )}
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={() => navigate("/login")} variant="body2">
                  Already have an account? Sign in
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
