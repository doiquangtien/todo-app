import {
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import HomeIcon from "@mui/icons-material/Home";
import { getListApi } from "../reducer/listSlice";

function SideBar({ idUser }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { list, loading } = useSelector((state) => state.list);
  useEffect(() => {
    dispatch(getListApi(idUser));
    // getListApi(dispatch, idUser);
  }, [dispatch, idUser]);
  const sortList = [...list].sort(function (x, y) {
    return Date.parse(x.createdAt) - Date.parse(y.createdAt);
  });
  return (
    <BoxStyle>
      <SideBarTop>
        <HomeIcon className="icon-home" onClick={() => navigate("/")} />
        <span>My List</span>
      </SideBarTop>
      {loading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", margin: "10px 0" }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={id}
          name="radio-buttons-group"
        >
          {sortList?.map((item, i) => (
            <FormControlLabel
              key={item.id}
              value={item.id}
              control={<Radio />}
              label={item.name}
              onChange={() => {
                navigate(`/list/${item.id}`);
              }}
            />
          ))}
        </RadioGroup>
      )}
    </BoxStyle>
  );
}

export default SideBar;

const SideBarTop = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  color: #1a76d2;
  .icon-home {
    margin-right: 20px;
    cursor: pointer;
    font-size: 30px;
  }
  span {
    font-size: 18px;
    font-weight: 600;
  }
`;

const BoxStyle = styled(Box)`
  border-radius: 16px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid #91d5ff;
`;
