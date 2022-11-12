import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

const Datatable = ({ dataColumns, dataRows, actionColumn }) => {
  return (
    <div className="datatable">
      <div className="datatableTitle"></div>
      <DataGrid
        className="datagrid"
        rows={dataRows}
        columns={dataColumns.concat(actionColumn)}
        pageSize={50}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
