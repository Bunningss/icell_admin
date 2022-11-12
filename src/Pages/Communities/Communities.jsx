import "./Communities.scss";
import Datatable from "../../Components/datatable/Datatable";
import { mahalColumns, mahalAction } from "../../static";
import { useEffect, useState } from "react";
import { userReq } from "../../requestMethods";

const Communities = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const getComms = async () => {
      try {
        const comms = await userReq.get("mahal/ids");
        setRows(comms.data.data.data.ids);
      } catch (err) {
        console.log(err);
      }
    };
    getComms();
  }, []);

  return (
    <div className="communities default">
      <h2 className="header section-header background">All Mahals</h2>
      <Datatable
        dataColumns={mahalColumns}
        dataRows={rows}
        actionColumn={mahalAction}
      />
    </div>
  );
};

export default Communities;
