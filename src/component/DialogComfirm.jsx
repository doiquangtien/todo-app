import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import ButtonCustom from "./ButtonCustom";

export default function DialogComfirm(props) {
  const { title, context, open, setOpen, handleDelete } = props;

  const onSubmit = () => {
    handleDelete();
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogForm>
          <DialogTitle className="titleDialog">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {context}
            </DialogContentText>
          </DialogContent>
          <DialogActions className="actionDialog">
            <ButtonCustom
              onClick={onSubmit}
              sx={{ width: "100px", marginRight: "50px" }}
              colorBtn="#1a76d2"
            >
              Agree
            </ButtonCustom>
            <ButtonCustom
              onClick={() => setOpen(false)}
              sx={{ width: "100px", backgroundColor: "#d9534f" }}
              // colorBtn="#d9534f"
            >
              Disagree
            </ButtonCustom>
          </DialogActions>
        </DialogForm>
      </Dialog>
    </div>
  );
}

const DialogForm = styled.div`
  min-width: 500px;
  height: 200px;
  text-align: center;

  .titleDialog {
    margin-top: 20px;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    color: #1a76d2;
  }
  .actionDialog {
    display: flex;
    justify-content: center;
  }
`;
