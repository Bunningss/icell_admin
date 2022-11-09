import { Link } from 'react-router-dom';
import { userReq } from './requestMethods';

export const familyColumns = [
  {
    field: "HeadName",
    headerName: "Head Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.HeadName}
        </div>
      );
    },
  },
  {
    field: "MahalId",
    headerName: "Mahal ID",
    width: 230,
  },
];

// Mahal
export const mahalColumns = [
  {
    field: "MahalId",
    headerName: "Mahal ID",
    width: 230,
    renderCell: (params) => {

      return (
        <div className="cellWithImg">
          {params.row.MahalId}
        </div>
      );
    },
  },
  {
    field: "MahalluName",
    MahalluName: "MahalluName",
    width: 230,
    renderCell: (params) => {

      return (
        <div className="cell">
          {params.row.MahalluName}
        </div>
      );
    },
  },
];

export const userColumns = [
  {
    field: "UserName",
    headerName: "Username",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.UserName}
        </div>
      );
    },
  },
  {
    field: "Email",
    headerName: "Email",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cell">
          {params.row.Email}
        </div>
      );
    },
  },
  {
    field: "MahalId",
    headerName: "Mahal ID",
    width: 230,
    sortable: true
  },
  {
    field: "TypeOfUser",
    headerName: "Role",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.TypeOfUser}
        </div>
      );
    },
  },
];

// Action Columns
export const familyAction = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      sortable: false,
      renderCell: (params) => {

        return (
          <div className="cellAction">
            <Link to={`/families/${params.row.FamilyId}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];

  export const userAction = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      sortable: false,
      renderCell: (params) => {

        return (
          <div className="cellAction">
            <Link to={`/user/details/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];

  export const mahalAction = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      sortable: false,
      renderCell: (params) => {
        let id = params.row.MahalId;

        const handleDelete = async () => {
          try {
            const result = await userReq.delete(`mahal/delete/${id}`)
            result.data.data?.data && window.location.reload()
          } catch (err) {
            console.log(err)
          }
        };

        return (
          <div className="cellAction">
            <Link to={`/mahal/details/${params.row.MahalId}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div onClick={handleDelete} style={{ textDecoration: "none" }}>
              <div className="viewButton">Delete</div>
            </div>
          </div>
        );
      },
    },
  ];

  export const reportAction = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/mahalreport/${params.row.MahalId}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View Report</div>
            </Link>
          </div>
        );
      },
    },
  ];
