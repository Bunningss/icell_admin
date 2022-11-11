import './Report.scss';
import PrimaryButton from '../../Components/PrimaryButton/PrimaryButton';
import { useState, useEffect } from 'react';
import { userReq } from '../../requestMethods';
import { Link } from 'react-router-dom';
import { PDFExport } from '@progress/kendo-react-pdf';
import { useRef } from 'react';

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
  const [ dlink, setDlink ] = useState('')

  useEffect(() => {
    const getComms = async () => {
      try {
        const comms = await userReq.get('mahal/ids');
        setRows(comms.data.data.data.ids            
            .filter((item) => { return mahalQuery.mahalId?.toLowerCase() === '' ? item : item.MahalId?.toLowerCase().includes(mahalQuery.mahalId.toLowerCase()) })
            .filter((item) => { return mahalQuery.mahalluDistrict?.toLowerCase() === '' ? item : item.MahalluDistrict?.toLowerCase().includes(mahalQuery.mahalluDistrict.toLowerCase()) })
            .filter((item) => { return mahalQuery.mahalluName?.toLowerCase() === '' ? item : item.MahalluName?.toLowerCase().includes(mahalQuery.mahalluName.toLowerCase()) })
            .filter((item) => { return mahalQuery.mahalluThalook?.toLowerCase() === '' ? item : item.MahalluThalook?.toLowerCase().includes(mahalQuery.mahalluThalook.toLowerCase()) })
            .filter((item) => { return mahalQuery.mahalluVillage?.toLowerCase() === '' ? item : item.MahalluVillage?.toLowerCase().includes(mahalQuery.mahalluVillage.toLowerCase()) })
            .filter((item) => { return mahalQuery.state?.toLowerCase() === '' ? item : item.State?.toLowerCase().includes(mahalQuery.state.toLowerCase()) }) )
      } catch (err) {
        console.log(err)
      }
    };
    getComms();
  }, [mahalQuery]);

  // Create CSV
let objUrl;
const getCsv = () => {
    let newArr = []
    const headers = Object.keys(rows[0])
    newArr.push(headers)

    rows.forEach((row) => {
        newArr.push(Object.values(row))
    })

    let csv = ''

    newArr.forEach((row) => {
        csv += row.join(',') + '\n'
    })

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8,' })
    objUrl = URL.createObjectURL(blob)
    setDlink(objUrl)
}

// Pdf Generate

const pdfExportComponent = useRef();

const handleClick = () => {
  pdfExportComponent.current.save()
}

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
      <div className="btn-wrapper">
        <PrimaryButton text={'download as PDF'} handleClick={handleClick}/>
        {
          rows.length > 0 &&
            <a onClick={getCsv} href={dlink} download='mahal.csv' className='csv-download'>download as CSV</a>
        }
      </div>
      <PDFExport ref={pdfExportComponent} paperSize="A2">
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
            rows.map((row, indx) => (
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
      </PDFExport>
    </div>
  )
}

export default Report