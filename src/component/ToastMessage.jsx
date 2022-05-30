import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { ToastMessageAction } from "../reducer/todoSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ToastMessage(props) {
  const { open, setOpen } = props;
  const dispatch = useDispatch();
  const toastTodo = useSelector((state) => state.todoList.toast);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setTimeout(() => {
      dispatch(
        ToastMessageAction({
          message: "",
          severity: "",
        })
      );
    }, 500);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={toastTodo.severity || ""}
          sx={{ width: "100%" }}
        >
          {toastTodo.message || ""}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
export default React.memo(ToastMessage);
