import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SelectPriority from "./SelectPriority";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import ButtonCustom from "./ButtonCustom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SaveIcon from "@mui/icons-material/Save";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { editTodoApi, postTodoApi } from "../redux/api";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "#f5f5f5",
  border: "1px solid #5ed4f3",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  padding: 0,
};
function TaskForm(props) {
  const {
    idUser,
    id,
    open,
    handleClose,
    dataForm,
    priority,
    setPriority,
    setDataForm,
    handleOpenToast,
  } = props;
  const { todoInputFrom } = useSelector((state) => state.todoList);
  const { todoList } = useSelector((state) => state.todoList);
  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const handleChangePriority = (e) => {
    const value = e.target.value;
    setPriority(value);
  };
  React.useEffect(() => {
    setValue("name", todoInputFrom.name);
    setValue("todo", todoInputFrom.todo);
  }, [setValue, todoInputFrom.name, todoInputFrom.todo]);

  const onSubmit = (data) => {
    const outPut = { ...data, status: false, priority, id: uuidv4() };
    postTodoApi(dispatch, outPut, todoList, idUser, id, handleOpenToast);
    handleClose();
    setDataForm({});
    resetField("name");
    resetField("todo");
  };
  const onSubmitEdit = (data) => {
    const outPut = { ...data, id: dataForm.row.id, status: false, priority };
    editTodoApi(
      dispatch,
      outPut,
      todoList,
      idUser,
      id,
      dataForm.row.id,
      handleOpenToast
    );
    handleClose();
    setDataForm({});
  };
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormHeader>
            {isEmpty(dataForm) ? "Add task" : "Edit task"}
          </FormHeader>
          <FormBottom
            onSubmit={
              isEmpty(dataForm)
                ? handleSubmit(onSubmit)
                : handleSubmit(onSubmitEdit)
            }
          >
            <TextStyle>
              <TextField
                {...register("name", {
                  required: true,
                  maxLength: {
                    value: 20,
                    message: "Please enter less than 20 characters.",
                  },
                })}
                id="name"
                label="Name"
                variant="outlined"
                style={{ width: "100%" }}
              />
            </TextStyle>
            {errors?.name?.type === "required" ? (
              <ErrorMessage>This field is required.</ErrorMessage>
            ) : (
              <ErrorMessage>{errors?.name?.message}</ErrorMessage>
            )}
            <TextStyle>
              <TextField
                {...register(
                  "todo",

                  {
                    required: true,
                    maxLength: {
                      value: 50,
                      message: "Please enter less than 50 characters.",
                    },
                  }
                )}
                id="todo"
                label="To do"
                variant="outlined"
                style={{ width: "100%" }}
              />
            </TextStyle>
            {errors?.todo?.type === "required" ? (
              <ErrorMessage>This field is required.</ErrorMessage>
            ) : (
              <ErrorMessage>{errors?.todo?.message}</ErrorMessage>
            )}
            <TextStyle>
              <SelectPriority
                value={priority}
                handleChange={handleChangePriority}
              />
            </TextStyle>
            <BtnGroup>
              {isEmpty(dataForm) ? (
                <ButtonCustom width="140px" colorBtn="#1a76d2" type="submit">
                  <SaveIcon />
                  <span>Save</span>
                </ButtonCustom>
              ) : (
                <ButtonCustom type="submit" width="140px" colorBtn="#1a76d2">
                  <SaveIcon />
                  <span>Edit</span>
                </ButtonCustom>
              )}

              <ButtonCustom
                width="140px"
                colorBtn="#d9534f"
                onClick={() => {
                  handleClose();
                  resetField("name");
                  resetField("todo");
                }}
              >
                <HighlightOffIcon />
                <span>Cancel</span>
              </ButtonCustom>
            </BtnGroup>
          </FormBottom>
        </Box>
      </Modal>
    </div>
  );
}

export default React.memo(TaskForm);

const ErrorMessage = styled.span`
  color: red;
`;

const FormHeader = styled.div`
  font-size: 24px;
  text-align: center;
  padding: 20px;
  color: #1a76d2;
  font-weight: 600;
  background-color: #e6f7ff;
  // border-bottom: 1px solid #91d5ff;
`;

const FormBottom = styled.form`
  margin: 10px 30px;
`;

const TextStyle = styled.div`
  width: 100%;
  margin: 10px 0;
`;
const BtnGroup = styled.div`
  width: 100%;
  margin: 30px 0 30px 0;
  display: flex;
  justify-content: space-around;
`;
