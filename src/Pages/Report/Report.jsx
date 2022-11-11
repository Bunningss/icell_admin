import './Report.scss';
import { useState, useEffect } from 'react';
import { userReq } from '../../requestMethods';
import { Link } from 'react-router-dom';

const Report = () => {
  const [ rows, setRows ] = useState([]);
  const [ mahalQuery, setMahalQuery ] = useState({
    mahalId: "",
    mahalluDistrict: "",
    mahalluName: "",
    mahalluThalook: "",
    mahalluVillage: "",
    state: ""
  });

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
      <div className="mahal-filters">
        <input type="text" placeholder='Search By Mahal ID' className="input report-input" onChange={(e) => setMahalQuery({ ...mahalQuery, ['mahalId']: e.target.value}) }/>
        <input type="text" placeholder='Search By Mahallu District' className="input report-input" onChange={(e) => setMahalQuery({ ...mahalQuery, ["mahalluDistrict"]: e.target.value}) }/>
        <input type="text" placeholder='Search By Mahallu Name' className="input report-input" onChange={(e) => setMahalQuery({ ...mahalQuery, ["mahalluName"]: e.target.value}) }/>
        <input type="text" placeholder='Search By Mahallu Thalook' className="input report-input" onChange={(e) => setMahalQuery({ ...mahalQuery, ["mahalluThalook"]: e.target.value}) }/>
        <input type="text" placeholder='Search By Mahallu Village' className="input report-input" onChange={(e) => setMahalQuery({ ...mahalQuery, ["mahalluVillage"]: e.target.value}) }/>
        <input type="text" placeholder='Search By State' className="input report-input" onChange={(e) => setMahalQuery({ ...mahalQuery, ["state"]: e.target.value})} />
      </div>
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
            rows
            .filter((item) => { return mahalQuery.mahalId?.toLowerCase() === '' ? item : item.MahalId?.toLowerCase().includes(mahalQuery.mahalId.toLowerCase()) })
            .filter((item) => { return mahalQuery.mahalluDistrict?.toLowerCase() === '' ? item : item.MahalluDistrict?.toLowerCase().includes(mahalQuery.mahalluDistrict.toLowerCase()) })
            .filter((item) => { return mahalQuery.mahalluName?.toLowerCase() === '' ? item : item.MahalluName?.toLowerCase().includes(mahalQuery.mahalluName.toLowerCase()) })
            .filter((item) => { return mahalQuery.mahalluThalook?.toLowerCase() === '' ? item : item.MahalluThalook?.toLowerCase().includes(mahalQuery.mahalluThalook.toLowerCase()) })
            .filter((item) => { return mahalQuery.mahalluVillage?.toLowerCase() === '' ? item : item.MahalluVillage?.toLowerCase().includes(mahalQuery.mahalluVillage.toLowerCase()) })
            .filter((item) => { return mahalQuery.state?.toLowerCase() === '' ? item : item.State?.toLowerCase().includes(mahalQuery.state.toLowerCase()) })
            .map((row, indx) => (
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