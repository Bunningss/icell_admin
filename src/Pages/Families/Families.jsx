import './Families.scss';
import { useEffect, useState } from 'react';
import Datatable from '../../Components/datatable/Datatable';
import { publicRequest } from '../../requestMethods';
import { familyColumns, familyAction } from '../../static';

const Families = () => {
  const [ rows, setRows ] = useState([]);

  useEffect(() => {
    const getFamilies = async () => {
      try {
        const families = await publicRequest.get('family/details/info')
        setRows(families.data.data.data.families);
      } catch (err) {
        console.log(err)
      }
    }
    getFamilies();
  }, []);

  return (
    <div className='families'>
      <h2 className="header families-header">All Families</h2>
      <Datatable dataColumns={familyColumns} dataRows={rows} actionColumn={familyAction}/>
    </div>
  )
}

export default Families