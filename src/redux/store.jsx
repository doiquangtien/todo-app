import todoListSlide from "../reducer/todoSlice";
import listSlide from "../reducer/listSlice";
import filterSlide from "../reducer/filterSlice";
import userSlide from "../reducer/userSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    todoList: todoListSlide,
    list: listSlide,
    filter: filterSlide,
    currentUser: userSlide,
  },
});

export default store;
