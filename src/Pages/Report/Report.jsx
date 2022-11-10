import './Report.scss';
import { useState, useEffect } from 'react';
import { userReq } from '../../requestMethods';
import { Link } from 'react-router-dom';

const Report = () => {
  const [ rows, setRows ] = useState([]);
  const [ query, setQuery ] = useState('');

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

      <input type="text" placeholder='Search by MahalluVillage, MahalluThalook, MahalluDistrict, State' className="input report-input" onChange={(e) => setQuery(e.target.value)} />
      {/* <Datatable dataColumns={mahalColumns} dataRows={rows} actionColumn={reportAction}/> */}
      <table>
        <thead>
          <tr>
            <th>Mahal ID</th>
            <th>Mahallu Name</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {
            rows.filter((row) => {
              return query.toLowerCase() === '' ? row : row.MahalId.toLowerCase().includes(query) || row.MahalluName.toLowerCase().includes(query) || row.MahalluVillage.toLowerCase().includes(query) || row.MahalluThalook.toLowerCase().includes(query) || row.MahalluDistrict.toLowerCase().includes(query) || row.State.toLowerCase().includes(query)
            }).map((row, indx) => (
              <tr key={indx}>
                <td>{row.MahalId}</td>
                <td>{row.MahalluName}</td>
                <td>
                  <Link to={`/mahalreport/${row.MahalId}`}>Details</Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Report