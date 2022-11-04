import './Dashboard.scss';
import Datatable from '../../Components/datatable/Datatable';
import { familyColumns, mahalColumns, familyAction, mahalAction } from "../../static";
import { useEffect, useState } from 'react';
import { publicRequest } from '../../requestMethods';
import InfoBox from '../../Components/InfoBox/InfoBox';
import { useSelector } from 'react-redux';

const Dashboard = ({ toolboxData }) => {
  const [ familyRows, setfamilyRows ] = useState([]);
  const [ mahalRows, setMahalRows ] = useState([]);

  const user = useSelector((state) => state.user)

  useEffect(() => {
    const getFams = async () => {
      try {
        const fam = await publicRequest.get("family/details/info?recent=recent");
        setfamilyRows(fam.data.data.data.families)
      } catch (err) {
        console.log(err)
      }
    };
    getFams();
  }, []);

  // fetch mahal data 
useEffect(() => {
  const getMahals = async () => {
    try {
      const mahals = await publicRequest.get('/mahal/ids?recent=recent')
      setMahalRows(mahals.data.data.data.ids)
    } catch (err) {
      console.log(err)
    }
  };
  getMahals()
}, [])

  return (
    <div className='dashboard default'>
      <div className="col background">
        <h2 className="header section-header dashboard-header">admin dashboard</h2>
      </div>
      <div className="col">
        <h2 className="header">Welcome, {user.currentUser?.User?.FirstName + ' ' + user.currentUser?.User?.LastName}.</h2>
        <p className="title dashboard-access">Authorization: <span>{user.currentUser?.User?.Role}</span></p>
        <div className="info">
          {
            toolboxData.map((data, indx) => (
              <InfoBox data={data} key={indx}/>
            ))
          }
        </div>
        <div className="recent">
          <div className="family recent-content">
              <p className='recent-text text-regular'>recently added families:</p>
            <div className="family-content data-table">
                <Datatable dataColumns={familyColumns} dataRows={familyRows} actionColumn={familyAction}/>
            </div>
          </div>
          <div className="mahals recent-content">
              <p className='recent-text text-regular'>recently added mahals:</p>
            <div className="mahal-content data-table">
                <Datatable dataColumns={mahalColumns} dataRows={mahalRows} actionColumn={mahalAction}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard