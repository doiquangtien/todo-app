import {
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";

function CustomToolbar() {
  return (
    <div
      style={{
        borderBottom: "1px solid #91d5ff",
        display: "flex",
        justifyContent: "flex-end",
        padding: "10px 0",
      }}
    >
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </div>
  );
}

export default CustomToolbar;
