import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AccountMenu from "../component/AccountMenu";
import { useSelector } from "react-redux";
import styled from "styled-components";

function Header() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.currentUser);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <RightHeader onClick={() => navigate("/")}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <CheckCircleOutlineIcon sx={{ fontSize: "30px" }} />
            </IconButton>
            <Typography variant="h6" sx={{ cursor: "pointer" }} component="div">
              My List
            </Typography>
          </RightHeader>
          {currentUser ? (
            <AccountMenu user={currentUser} />
          ) : (
            <div>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/register")}>
                Register
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default React.memo(Header);

const RightHeader = styled.div`
  display: flex;
  align-items: center;
`;
