import "./Users.scss";
import { userColumns, userAction } from "../../static";
import Datatable from "../../Components/datatable/Datatable";
import { useEffect, useState } from "react";
import { userReq } from "../../requestMethods";

const Users = () => {
  const [userRows, setUserRows] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await userReq.get("user/getall");
        setUserRows(users.data.data.users);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);
  return (
    <div className="users default">
      <h2 className="header section-header background">All Users</h2>
      <Datatable
        dataColumns={userColumns}
        dataRows={userRows}
        actionColumn={userAction}
      />
    </div>
  );
};

export default Users;
