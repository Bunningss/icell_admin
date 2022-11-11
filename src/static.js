import { useState } from 'react';
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

        const handleAction = () => {
          document.querySelector('.confirmation').classList.toggle('active');
        }

        return (
          <div className="cellAction">
            <Link to={`/mahal/details/${params.row.MahalId}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div style={{ textDecoration: "none" }} onClick={handleAction}>
              <div className="deleteButton">Delete</div>
            </div>
            <div className='confirmation'>
              <div className='content'>
                <h4 className='title'>Are you sure you want to delete ?</h4>
                <div className='btn-wrapper'>
                  <button className='viewButton' onClick={handleAction}>No</button>
                  <button className='deleteButton' onClick={handleDelete}>Yes</button>
                </div>
              </div>
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
