import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const userSlide = createSlice({
  name: "currentUser",
  initialState: {
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    errorLogin: false,
    errorRegister: false,
  },
  reducers: {
    logOutAction(state, action) {
      state.currentUser = action.payload;
    },
    setLoadingAction(state, action) {
      state.loading = action.payload;
    },
    setErrorRegisterAction(state, action) {
      state.errorRegister = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUserAction.pending, (state, action) => {
        state.loading = true;
        state.errorLogin = false;
      })
      .addCase(getCurrentUserAction.fulfilled, (state, action) => {
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(getCurrentUserAction.rejected, (state, action) => {
        state.loading = false;
        state.errorLogin = true;
      });
  },
});

export const { logOutAction, setLoadingAction, setErrorRegisterAction } =
  userSlide.actions;
export default userSlide.reducer;

export const getCurrentUserAction = createAsyncThunk(
  "currentUser/getCurrentUserAction",
  async (data) => {
    const res = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    return {
      email: res.user.email,
      uid: res.user.uid,
    };
  }
);
