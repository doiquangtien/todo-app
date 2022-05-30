import { createSlice } from "@reduxjs/toolkit";

const todoListSlide = createSlice({
  name: "todoList",
  initialState: {
    todoInputFrom: {
      name: "",
      todo: "",
      status: false,
      priority: "High",
    },
    todoList: [],
    toast: {
      message: "",
      severity: "",
    },
    loading: false,
    loadingBtn: false,
  },
  reducers: {
    loadingAction(state, action) {
      state.loading = action.payload;
    },
    loadingBtnAction(state, action) {
      state.loadingBtn = action.payload;
    },
    getTodoInputForm(state, action) {
      state.todoInputFrom = action.payload;
    },
    getTodo(state, action) {
      state.todoList = action.payload;
    },
    updateTodo(state, action) {
      state.todoList = action.payload;
    },
    deleteTodo(state, action) {
      state.todoList = action.payload;
    },
    ToastMessageAction(state, action) {
      state.toast = action.payload;
    },
  },
});

export const {
  getTodoInputForm,
  getTodo,
  updateTodo,
  deleteTodo,
  ToastMessageAction,
  loadingAction,
  loadingBtnAction,
} = todoListSlide.actions;
export default todoListSlide.reducer;
