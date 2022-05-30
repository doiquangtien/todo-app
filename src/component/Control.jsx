import React from "react";
import Grid from "@mui/material/Grid";

import SearchInput from "./SearchInput";
import SearchStatus from "./SearchStatus";

function Control() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={8}>
        <SearchInput />
      </Grid>
      <Grid item xs={4}>
        <SearchStatus />
      </Grid>
    </Grid>
  );
}

export default Control;
