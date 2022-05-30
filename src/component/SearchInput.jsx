import { TextField, Box } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchTextAction } from "../reducer/filterSlice";

function SearchInput() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const handleChangeInput = (e) => {
    setValue(e.target.value);
    dispatch(searchTextAction(e.target.value));
  };
  return (
    <Box
      sx={{
        width: 700,
        maxWidth: "100%",
      }}
    >
      <TextField
        sx={{ borderColor: "#91d5ff" }}
        fullWidth
        label="Search"
        id="fullWidth"
        value={value}
        onChange={handleChangeInput}
      />
    </Box>
  );
}

export default SearchInput;
