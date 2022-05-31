import { Box, Button, Grid, Skeleton, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AccordionItem from "../component/AccordionItem";
import { deleteListApi, postListApi } from "../redux/api";
import ToastMessage from "../component/ToastMessage";
import DialogComfirm from "../component/DialogComfirm";
import { v4 as uuidv4 } from "uuid";
import { ToastMessageAction } from "../reducer/todoSlice";
import { getListApi } from "../reducer/listSlice";
import { useForm } from "react-hook-form";

function List() {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.currentUser);
  const { list, loading } = useSelector((state) => state.list);
  const [openComfirm, setOpenComfirm] = React.useState(false);
  const [idList, setIdList] = useState("");
  const [openToast, setOpenToast] = React.useState(false);
  const handleOpenToast = () => {
    setOpenToast(true);
  };

  useEffect(() => {
    dispatch(getListApi(currentUser.uid));
  }, [dispatch, currentUser.uid]);
  const handleAddList = (data) => {
    postListApi(
      dispatch,
      {
        name: data.name,
        createdAt: new Date().toISOString(),
        todos: [],
      },
      currentUser.uid,
      uuidv4()
    )
      .then(() => {
        dispatch(
          ToastMessageAction({
            message: "Add list successful !",
            severity: "success",
          })
        );
        handleOpenToast();
      })
      .catch(() => {
        dispatch(
          ToastMessageAction({
            message: "WHOOPS! Something went wrong please try again ",
            severity: "warning",
          })
        );
        handleOpenToast();
      });
    resetField("name");
  };

  const handleDeleteList = (idList) => {
    deleteListApi(dispatch, currentUser.uid, idList);
  };

  const sortList = [...list].sort(function (x, y) {
    return Date.parse(x.createdAt) - Date.parse(y.createdAt);
  });

  return (
    <>
      <ToastMessage open={openToast} setOpen={setOpenToast} />
      <DialogComfirm
        title="Comfirm"
        context="Are you sure you want to delete?"
        open={openComfirm}
        setOpen={setOpenComfirm}
        handleDelete={() => {
          handleDeleteList(idList);
        }}
      />

      <BoxStyle>
        {loading ? (
          <Stack spacing={1}>
            <Skeleton variant="text" height={50} />
            <Skeleton variant="rectangular" width="100%" height={118} />
          </Stack>
        ) : (
          <Grid container spacing={2}>
            <Grid
              className="grid-top"
              item
              xs={12}
              sx={{ display: "flex", flexWrap: "wrap" }}
            >
              <TextField
                {...register("name", {
                  required: true,
                  maxLength: {
                    value: 30,
                    message: "Please enter less than 30 characters.",
                  },
                })}
                className="grid-top-input"
                id="standard-basic"
                label="Add your list"
                variant="standard"
              />
              <Button variant="contained" onClick={handleSubmit(handleAddList)}>
                Add List
              </Button>
              {errors?.name?.type === "maxLength" && (
                <ErrorMessage>{errors?.name?.message}</ErrorMessage>
              )}
            </Grid>

            <Grid item xs={12}>
              {sortList?.map((item, i) => (
                <AccordionItem
                  key={i}
                  data={item}
                  handleOpenComfirm={() => {
                    setOpenComfirm(true);
                    setIdList(item.id);
                  }}
                />
              ))}
            </Grid>
          </Grid>
        )}
      </BoxStyle>
    </>
  );
}

export default List;

const BoxStyle = styled(Box)`
  padding: 10px 20px;
  position: relative;
  top: 100px;
  max-width: 800px;
  margin: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid #91d5ff;
  .grid-top {
    display: flex;
    align-items: center;
    width: 100%;
    .grid-top-input {
      width: 40%;
      margin-right: 30px;
    }
  }
`;

const ErrorMessage = styled.span`
  margin-top: 5px;
  color: red;
  width: 100%;
`;
