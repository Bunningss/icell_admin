import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState } from "react";

const Datatable = ({ dataColumns, dataRows, actionColumn }) => {

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

// const actionColumn = [
//     {
//       field: "action",
//       headerName: "Action",
//       width: 200,
//       renderCell: (params) => {
//         console.log(params.row)
//         return (
//           <div className="cellAction">
//             <Link to={`/user/${params.row._id}`} style={{ textDecoration: "none" }}>
//               <div className="viewButton">View</div>
//             </Link>
//             {/* <div
//               className="deleteButton"
//               onClick={() => handleDelete(params.row.id)}
//             >
//               Terminate
//             </div> */}
//           </div>
//         );
//       },
//     },
//   ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
      </div>
      <DataGrid
        className="datagrid"
        rows={dataRows}
        columns={dataColumns.concat(actionColumn)}
        pageSize={20}
        rowsPerPageOptions={[30]}
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
