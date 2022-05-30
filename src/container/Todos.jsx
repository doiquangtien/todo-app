import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import DataObjectIcon from "@mui/icons-material/DataObject";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { ButtonCustom, Control, TaskForm, TaskList } from "../component";
import styled from "styled-components";
import { getListById, postTodoApi } from "../redux/api";
import SideBar from "../component/SideBar";
import ToastMessage from "../component/ToastMessage";
import { generateData } from "../constants/generateDta";
import { FormControl, MenuItem, Select, Skeleton } from "@mui/material";
import { getTodoInputForm } from "../reducer/todoSlice";

function Todos() {
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.currentUser);
  const { listById } = useSelector((state) => state.list);
  const { todoList, loading, loadingBtn } = useSelector(
    (state) => state.todoList
  );
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [dataForm, setDataForm] = useState({});
  const [priority, setPriority] = React.useState("High");
  const [openToast, setOpenToast] = React.useState(false);
  const [sortTodo, setSortTodo] = useState("default");
  const [arrRandomNum, setArrRamdomNum] = useState([]);
  useEffect(() => {
    let isSubscribe = true;
    getListById(dispatch, currentUser.uid, id, isSubscribe);
    return () => {
      isSubscribe = false;
    };
  }, [dispatch, currentUser.uid, id]);

  const handleOpenToast = useCallback(() => {
    setOpenToast(true);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
    setPriority("High");
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setDataForm({});
    dispatch(
      getTodoInputForm({
        name: "",
        todo: "",
        status: false,
        priority: "High",
      })
    );
  }, [dispatch]);

  const handleRandomData = () => {
    let flag = false;

    if (arrRandomNum.length === generateData.length) {
      setArrRamdomNum([]);
    } else {
      flag = true;
    }
    let randomData = Math.floor(Math.random() * generateData.length);
    if (flag) {
      do {
        randomData = Math.floor(Math.random() * generateData.length);
      } while (arrRandomNum.includes(randomData));
    }
    setArrRamdomNum((prev) => [...prev, randomData]);
    const data = { ...generateData[randomData], id: uuidv4() };
    postTodoApi(dispatch, data, todoList, currentUser.uid, id, handleOpenToast);
  };
  return (
    <>
      <ToastMessage open={openToast} setOpen={setOpenToast} />
      <Box
        style={{
          position: "relative",
          top: "20px",
          padding: "0",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <SideBar idUser={currentUser.uid} />
          </Grid>
          <Grid item xs={10}>
            <GridStyle container>
              <Grid className="todo-heading" item xs={12}>
                {loading ? (
                  <Skeleton variant="text" height={83} />
                ) : (
                  <Heading>{listById?.name}</Heading>
                )}
              </Grid>
              <Grid className="todo-heading" item xs={12}>
                <TaskForm
                  idUser={currentUser.uid}
                  id={id}
                  open={open}
                  handleClose={handleClose}
                  dataForm={dataForm}
                  priority={priority}
                  setPriority={setPriority}
                  setDataForm={setDataForm}
                  handleOpenToast={handleOpenToast}
                />
              </Grid>
              <Grid item xs={12}>
                <BtnGroup>
                  <ButtonCustom
                    className="btn-child"
                    width="170px"
                    onClick={handleOpen}
                    disabled={loadingBtn}
                  >
                    <AddIcon />
                    <span>Add new task</span>
                  </ButtonCustom>
                  <ButtonCustom
                    className="btn-child"
                    width="180px"
                    colorBtn="#d9534f"
                    onClick={handleRandomData}
                    disabled={loadingBtn}
                  >
                    <DataObjectIcon />
                    <span>Generate Data</span>
                  </ButtonCustom>
                  <div className="titleSort">Sort By: </div>

                  <FormControl className="sortForm">
                    <Select
                      labelId="demo-simple-select-label"
                      className="sortSelect"
                      value={sortTodo}
                      onChange={(e) => {
                        setSortTodo(e.target.value);
                      }}
                    >
                      <MenuItem value="default">Default</MenuItem>
                      <MenuItem value="A-Z">A-Z</MenuItem>
                      <MenuItem value="Z-A">Z-A</MenuItem>
                    </Select>
                  </FormControl>
                </BtnGroup>
              </Grid>
              <Grid item xs={12} style={{ margin: "20px 0" }}>
                <Control />
              </Grid>
              <Grid item xs={12}>
                <TaskList
                  id={id}
                  handleOpen={handleOpen}
                  setDataForm={setDataForm}
                  setPriority={setPriority}
                  handleOpenToast={handleOpenToast}
                  sortTodo={sortTodo}
                />
              </Grid>
            </GridStyle>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Todos;

const BtnGroup = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;

  .btn-child {
    margin-right: 50px;
  }
  .titleSort {
    color: #1a76d2;
    font-size: 20px;
    font-weight: 500;
    margin-right: 10px;
  }
  .sortForm {
    background-color: #1a76d2;
    height: 45px;
    width: 120px;
    text-align: center;
    border-radius: 5px;
    overflow: hidden;
    color: #fff;
    .sortSelect {
      color: #fff;
      font-weight: 400;
      height: 45px;
    }
  }
`;

const GridStyle = styled(Grid)`
  padding: 5px 20px;
  /* From https://css.glass */
  background: rgba(255, 255, 255, 1);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid #91d5ff;
`;

const Heading = styled.h1`
  font-size: 36px;
  padding: 20px 0;
  margin: 0;
  text-align: center;
  color: #1a76d2;
  border-bottom: 1px solid #91d5ff;
`;
