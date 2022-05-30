import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch } from "react-redux";
import { searchStatusAction } from "../reducer/filterSlice";

function SearchStatus() {
  const [value, setValue] = useState("All");
  const dispatch = useDispatch();
  return (
    <FormControl>
      <FormLabel
        id="demo-radio-buttons-group-label"
        style={{ color: "#1a76d2", fontWeight: 500 }}
      >
        Status
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        value={value}
        name="radio-buttons-group"
        onChange={(e) => {
          setValue(e.target.value);
          dispatch(searchStatusAction(e.target.value));
        }}
      >
        <FormControlLabel value="All" control={<Radio />} label="All" />
        <FormControlLabel
          value="Completed"
          control={<Radio />}
          label="Completed"
        />
        <FormControlLabel value="Todo" control={<Radio />} label="To do" />
      </RadioGroup>
    </FormControl>
  );
}

export default SearchStatus;
