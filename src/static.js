import { Link } from 'react-router-dom';

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
    field: "Mahallu ID",
    mahalId: "MahalId",
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
    field: "Mahallu Name",
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
    field: "Username",
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
    field: "email",
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
  },
  {
    field: "role",
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
      renderCell: (params) => {

        return (
          <div className="cellAction">
            <Link to={`/users/${params.row._id}`} style={{ textDecoration: "none" }}>
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
      width: 200,
      renderCell: (params) => {

        return (
          <div className="cellAction">
            <Link to={`/communities/${params.row.MahalId}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];