import Button from "@mui/material/Button";
import { memo } from "react";

function ButtonCustom(props) {
  const { children, colorBtn, width, ...rest } = props;
  return (
    <Button
      disableElevation
      variant="contained"
      sx={{
        width: width,
        height: "45px",
        backgroundColor: colorBtn,
        display: "flex",
        justifyContent: "space-evenly",
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}

export default memo(ButtonCustom);
