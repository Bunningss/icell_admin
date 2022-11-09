import './ViewFamily.scss';
import { userReq } from '../../requestMethods';
import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import DetailsCard from '../../Components/DetailsCard/DetailsCard';
import { PDFExport } from '@progress/kendo-react-pdf';
import logo from '../../images/logo.png';

const ViewFamily = () => {
  const  [ family, setFamily ] = useState({})
  const location = useLocation();
  const id = location.pathname.split('/')[2];

  const pdfExportComponent = useRef(null);
  
  useEffect(() => {
    const getFamily =async () => {
      try {
        const family = await userReq.get(`/family/details/info/${id}`)
        setFamily(family.data.data.data)
      } catch (err) {
        console.log(err)
      }
    };
    getFamily();
  }, [id]);

  const handleClick = () => {
    pdfExportComponent.current.save();
  };

  return (
    <div className='view-family default'>
    <PDFExport ref={pdfExportComponent} paperSize='A2'>
      <img src={logo} alt="" className="logo" />
      {
        family.family &&
        <div className="family background">
          <h2 className="header section-header">family information</h2>
          <p className="family-text text-regular">Family Head: <span>{family.family.HeadName}</span></p>
          <p className="family-text text-regular">Email: <span>{family.family.Email}</span></p>
          <p className="family-text text-regular">Family ID: <span> {family.family.FamilyId}</span></p>
          <p className="family-text text-regular">Gender: <span> {family.family.Gender}</span></p>
          <p className="family-text text-regular">House Name: <span> {family.family.HouseName}</span></p>
          <p className="family-text text-regular">Land Name: <span> {family.family.LandName}</span></p>
          <p className="family-text text-regular">Mahal ID: <span>{family.family.MahalId}</span></p>
          <p className="family-text text-regular">Members Count: <span>{family.family.MembersCount}</span></p>
          <p className="family-text text-regular">Ration Category: <span>{family.family.RationCategory}</span></p>
          <p className="family-text text-regular">Phone: <span>{family.family.Phone}</span></p>
        </div>
      }
      <div className="members">
        {
          family?.member?.length > 0 &&
          <h2 className="background header section-header">Family members</h2>
        }
        <div className="content">
          {
            family.member &&
            family.member.map((m, indx) => (
              <DetailsCard member={m} key={indx}/>
            ))
          }
        </div>
      </div>
    </PDFExport>
      <button className="button" onClick={handleClick}>Download as PDF</button>
    </div>
  )
}

export default ViewFamily