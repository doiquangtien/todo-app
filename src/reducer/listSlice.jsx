import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const listSlide = createSlice({
  name: "list",
  initialState: {
    list: [],
    listById: {},
    loading: false,
  },
  reducers: {
    // getListAction(state, action) {
    //   state.list = action.payload;
    // },
    getListByIdAction(state, action) {
      state.listById = action.payload;
    },
    postListAction(state, action) {
      state.list.push(action.payload);
    },
    deleteListAction(state, action) {
      const newDeleteList = [...state.list].filter(
        (item) => item.id !== action.payload
      );
      state.list = newDeleteList;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(getListApi.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      });
  },
});

export const {
  getListAction,
  getListByIdAction,
  postListAction,
  deleteListAction,
} = listSlide.actions;
export default listSlide.reducer;

export const getListApi = createAsyncThunk("list/getListApi", async (id) => {
  const docRef = collection(db, "users", id, "list");
  const docSnap = await getDocs(docRef);
  const list = [];
  docSnap.forEach((doc) => {
    list.push(doc.data());
  });
  return list;
});
