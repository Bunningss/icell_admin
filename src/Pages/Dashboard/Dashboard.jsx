import './Dashboard.scss';
import Datatable from '../../Components/datatable/Datatable';
import { familyColumns, mahalColumns, userAction } from "../../static";
import { useEffect, useState } from 'react';
import { publicRequest } from '../../requestMethods';

const Dashboard = () => {
  const [ familyRows, setfamilyRows ] = useState([]);
  const [ mahalRows, setMahalRows ] = useState([]);

  // useEffect(() => {
  //   const getFams = async () => {
  //     try {
  //       const fam = await publicRequest.get("family/details/info");
  //       setfamilyRows(fam.data.data.data.families)
  //       console.log(fam)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   };
  //   getFams();
  // }, []);

  // fetch mahal data 
useEffect(() => {
  const getMahals = async () => {
    try {
      const mahals = await publicRequest.get('/mahal/ids')
      setMahalRows(mahals.data.data.data.ids)
    } catch (err) {
      console.log(err)
    }
  };
  getMahals()
}, [])
console.log(mahalRows)
  return (
    <div className='dashboard'>
      {/* <div className="col">
        <h2 className="header dashboard-header">icell</h2>
      </div> */}
      <div className="col">
        <h2 className="header">Welcome, John Doe.</h2>
        <p className="title dashboard-access">Authorization: <span>Admin</span></p>
        <div className="recent">
          <div className="families recent-content">
              <p className='recent-text text-regular'>recently added families:</p>
            <div className="family-content data-table">
                <Datatable dataColumns={familyColumns} dataRows={familyRows} actionColumn={userAction}/>
            </div>
          </div>
          <div className="mahals recent-content">
              <p className='recent-text text-regular'>recently added mahals:</p>
            <div className="mahal-content data-table">
                <Datatable dataColumns={mahalColumns} dataRows={mahalRows} actionColumn={userAction}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard