import React, { useEffect } from "react";
import styled from "styled-components";
import Container from "@mui/material/Container";
import Header from "./Header";
import { useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [location.pathname]);

  return (
    <WrapApp>
      <Header />
      <Container style={{ maxWidth: "1400px" }}>{children}</Container>
    </WrapApp>
  );
}

export default Layout;

const WrapApp = styled.div`
  position: relative;
  z-index: 1;
  height: 100vh;
  &:before {
    content: "";
    position: absolute;
    top: 64px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-image: url("https://preview.pixlr.com/images/800wm/1176/2/1176106312.jpg");
    opacity: 0.2;
  }
`;
