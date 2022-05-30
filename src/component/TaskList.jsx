import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckStatus from "./CheckStatus";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodoApi } from "../redux/api";
import DialogComfirm from "./DialogComfirm";
import styled from "styled-components";
import { sortBy } from "lodash";
import { getTodoInputForm } from "../reducer/todoSlice";
import { LinearProgress } from "@mui/material";
import CustomNoRowsOverlay from "./CustomDataGrids/CustomNoRows";
import CustomPagination from "./CustomDataGrids/CustomFooterDataGrid";

const tagColor = {
  High: {
    color: "#d4380d",
    bgcolor: "#fef2e8",
    border: "1px solid #fbc4a4",
  },
  Medium: {
    color: "#096dd9",
    bgcolor: "#e6f7ff",
    border: "1px solid #91d5ff",
  },
  Low: {
    color: "#000000d9",
    bgcolor: "rgb(247, 241, 241)",
    border: "1px solid #d9d9d9",
  },
};

function TaskList({
  id,
  handleOpen,
  setDataForm,
  setPriority,
  handleOpenToast,
  sortTodo,
}) {
  const dispatch = useDispatch();
  const [params, setParams] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(10);
  const { currentUser } = useSelector((state) => state.currentUser);
  const { todoList, loading } = useSelector((state) => state.todoList);
  const todoFilter = useSelector((state) => {
    return state.todoList.todoList.filter((item) => {
      if (state.filter.filter.searchStatus === "All") {
        return item.todo
          .toLowerCase()
          .includes(state.filter.filter.searchText.toLowerCase());
      }
      return (
        item.todo
          .toLowerCase()
          .includes(state.filter.filter.searchText.toLowerCase()) &&
        (state.filter.filter.searchStatus === "Completed"
          ? item.status
          : !item.status)
      );
    });
  });

  const sortTodoList = sortBy(todoFilter, (item) => {
    return item.todo.toLowerCase();
  });

  const rows =
    (sortTodo === "default" && todoFilter) ||
    (sortTodo === "A-Z" && sortTodoList) ||
    (sortTodo === "Z-A" && sortTodoList.reverse());
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      headerClassName: "column-header",
    },
    {
      field: "name",
      headerName: "Name",
      width: 170,
      headerClassName: "column-header",
    },
    {
      field: "todo",
      headerName: "Task",
      width: 370,
      headerClassName: "column-header",
    },
    {
      field: "status",
      headerName: "Status",
      type: "boolean",
      width: 160,
      renderCell: (params) => {
        return (
          <CheckStatus
            todoList={todoList}
            idUser={currentUser.uid}
            id={id}
            data={params}
            handleOpenToast={handleOpenToast}
          />
        );
      },
      headerClassName: "column-header",
      cellClassName: "cell-center",
    },
    {
      field: "priority",
      headerName: "Priority",
      type: "actions",
      width: 160,
      headerClassName: "column-header",
      cellClassName: "cell-center",
      renderCell: (params) => {
        return (
          <PriorityStyle
            style={{
              color: tagColor[params.row.priority].color,
              backgroundColor: tagColor[params.row.priority].bgcolor,
              border: tagColor[params.row.priority].border,
            }}
          >
            {params.row.priority}
          </PriorityStyle>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 130,
      headerClassName: "column-header",
      getActions: (params) => [
        <GridActionsCellItem
          onClick={() => {
            handleEdit(params);
          }}
          icon={<EditIcon style={{ color: "#1a76d2" }} />}
          label="Edit"
        />,
        <GridActionsCellItem
          onClick={() => {
            setOpen(true);
            setParams(params);
          }}
          icon={<DeleteIcon style={{ color: "#d9534f" }} />}
          label="Delete"
        />,
      ],
    },
  ];

  const handleDelete = (params) => {
    deleteTodoApi(
      dispatch,
      currentUser.uid,
      id,
      params.id,
      todoList,
      handleOpenToast
    );
  };

  const handleEdit = (params) => {
    dispatch(
      getTodoInputForm({
        name: params.row.name,
        todo: params.row.todo,
        status: params.row.status,
        priority: params.row.priority,
      })
    );
    handleOpen();
    setPriority(params.row.priority);

    setDataForm(params);
  };
  return (
    <div style={{ height: 640, width: "100%" }}>
      <DialogComfirm
        title="Comfirm"
        context="Are you sure you want to delete?"
        open={open}
        setOpen={setOpen}
        handleDelete={() => handleDelete(params)}
      />
      <DataGridStyle
        sx={{
          border: 1,
          borderColor: "#91d5ff",
        }}
        // getRowClassName={(params) => console.log(params)}
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 20, 30]}
        pagination
        loading={loading}
        disableSelectionOnClick
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
          LoadingOverlay: LinearProgress,
          // Toolbar: CustomToolbar,
          // Pagination: CustomPagination,
          Footer: CustomPagination,
        }}
      />
    </div>
  );
}

export default React.memo(TaskList);

const DataGridStyle = styled(DataGrid)`
  .column-header {
    color: #1a76d2;
  }
  .cell-center {
    display: flex !important;
    justify-content: center !important;
  }
`;

const PriorityStyle = styled.div`
  text-align: center;
  padding: 3px 0;
  width: 50%;
  border-radius: 3px;
`;
