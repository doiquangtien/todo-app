import { createSlice } from "@reduxjs/toolkit";

const filterSlide = createSlice({
  name:"filter",
  initialState :{
    filter: {
      searchText: "",
      searchStatus: "All",
    },
  },
  reducers:{
    searchTextAction(state,action){
      state.filter.searchText = action.payload
    },
    searchStatusAction(state,action){
      state.filter.searchStatus = action.payload
    },
  }
})


export const { searchTextAction, searchStatusAction } = filterSlide.actions
export default filterSlide.reducer

