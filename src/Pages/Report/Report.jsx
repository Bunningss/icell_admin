import './Report.scss';
import Datatable from '../../Components/datatable/Datatable';
import { mahalColumns, reportAction } from '../../static';
import { useState, useEffect } from 'react';
import { userReq } from '../../requestMethods';

const Report = () => {
  const [ rows, setRows ] = useState([]);
  useEffect(() => {
    const getComms = async () => {
      try {
        const comms = await userReq.get('mahal/ids');
        setRows(comms.data.data.data.ids)
      } catch (err) {
        console.log(err)
      }
    };
    getComms();
  }, []);
  return (
    <div className='report default'>
      <h2 className="report-title">Click to view specific mahal report</h2>
      <Datatable dataColumns={mahalColumns} dataRows={rows} actionColumn={reportAction}/>
    </div>
  )
}

export default Report