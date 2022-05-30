import * as React from "react";
import {
  gridPageCountSelector,
  gridPageSelector,
  GridToolbarDensitySelector,
  GridToolbarExport,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import styled from "styled-components";

export default function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <CustomFooterStyle>
      <CustomToolBar>
        <GridToolbarDensitySelector sx={{ fontSize: "14px" }} />
        <GridToolbarExport sx={{ fontSize: "14px" }} />
      </CustomToolBar>
      <Pagination
        color="primary"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    </CustomFooterStyle>
  );
}

const CustomFooterStyle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-top: 1px solid #91d5ff;
`;

const CustomToolBar = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
