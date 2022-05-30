import * as React from "react";
import styled from "styled-components";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { checkStatusApi } from "../redux/api";
import { useDispatch } from "react-redux";

function CheckStatus({ todoList, id, idUser, data, handleOpenToast }) {
  const dispatch = useDispatch();
  const [status, setStatus] = React.useState(data.row.status);
  const handleCheck = () => {
    setStatus(!status);
    checkStatusApi(
      dispatch,
      {
        ...data.row,
        status: !status,
      },
      todoList,
      idUser,
      id,
      data.row.id,
      handleOpenToast
    );
  };
  return (
    <div onClick={handleCheck}>
      {status ? (
        <CheckStyle
          style={{
            color: "#52c41a",
            backgroundColor: "#f6ffed",
            border: "1px solid #b7eb8f",
          }}
        >
          <CheckCircleOutlineIcon className="iconCheck" />
          success
        </CheckStyle>
      ) : (
        <CheckStyle
          style={{
            color: "#1890ff",
            backgroundColor: "#e6f7ff",
            border: "1px solid #91d5ff",
          }}
        >
          <AutorenewIcon className="iconCheck" />
          processing
        </CheckStyle>
      )}
    </div>
  );
}

export default React.memo(CheckStatus);

const CheckStyle = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 0;
  border-radius: 20px;
  padding: 3px 10px;
  cursor: pointer;
  background-color: red;
  font-size: 14px;
  .iconCheck {
    margin-right: 3px;
    font-size: 16px;
  }
`;
