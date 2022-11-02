import './Communities.scss';
import Datatable from '../../Components/datatable/Datatable';
import { mahalColumns, mahalAction } from '../../static';
import { useEffect, useState } from 'react';
import { publicRequest } from '../../requestMethods';

const Communities = () => {
  const [rows, setRows] = useState([])
  useEffect(() => {
    const getComms = async () => {
      try {
        const comms = await publicRequest.get('mahal/ids');
        setRows(comms.data.data.data.ids)
        // console.log(comms)
      } catch (err) {
        console.log(err)
      }
    };
    getComms();
  }, []);

  return (
    <div className='communities'>
      <h2 className="header section-header background">All Mahals</h2>
      <Datatable dataColumns={mahalColumns} dataRows={rows} actionColumn={mahalAction}/>
    </div>
  )
}

export default Communities