import './MahalReport.scss';
import PrimaryButton from '../../Components/PrimaryButton/PrimaryButton';
import InfoBox from '../../Components/InfoBox/InfoBox';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { userReq } from '../../requestMethods';
import { PDFExport } from '@progress/kendo-react-pdf';

const MahalReport = () => {
  const [ query, setQuery ] = useState('');
  const [ mahal, setMahal ] = useState({});
  const [ families, setFamilies ] = useState([]);
  const [ report, setReport ] = useState('');
  const location = useLocation();
  let id = location.pathname.split('/')[2];

  const pdfExportComponent = useRef(null);

  useEffect(() => {
    const getMahal = async () => {
      try {
        const mahal = await userReq.get(`/mahal/view/${id}`)
        setMahal(mahal.data.data.data.mahalDetails[0])
      } catch (err) {
        console.log(err)
      }
    };
    getMahal();
  }, [id]);

  useEffect(() => {
    const getReport = async () => {
      const report = await userReq.get(`/combined/report/${id}`)
      setReport(report.data.data.data);
    };
    getReport();
  }, [id]);

  useEffect(() => {
    const getFamilies = async () => {
      const families = await userReq.get(`family/mahal/family/${id}`);
      setFamilies(families.data.data.data)
    };
    getFamilies();
  }, [id]);

  const mahalStats = [
    {
      title: "Families",
      number: report.family?.length
    },
    {
      title: "Family Members",
      number: report.familyMember?.length
    },
    {
      title: "Admins",
      number: report.admins?.length
    },
    {
      title: "People",
      number: report.familyMember?.length + report.family?.length + report.admins?.length 
    },
  ];

  const handleClick = () => {
    pdfExportComponent.current.save();
  };

  return (
    <div className="mahal-report default">
      <div className="report-filters">
        <div className="wrapper">
          <input type="text" placeholder='Search by Family Head or Land Name or House Name or Family ID' className="filter-input input" onChange={(e) => setQuery(e.target.value)}/>
        </div>
        <PrimaryButton text={"Download as PDF"} handleClick={handleClick}/>
      </div>
    <PDFExport ref={pdfExportComponent} paperSize="A2">
      <div className="report-wrapper">
          <h2 className="header section-header">mahal report</h2>
          <div className="mahallu-details">
            <h4 className="title mahal-details-title">Mahallu Name <span>{mahal.MahalluName}</span></h4>
            <h4 className="title mahal-details-title">Mahallu ID <span>{mahal.MahalId}</span></h4>
            <h4 className="title mahal-details-title">mosque Name <span>{mahal.MosqueName}</span></h4>
            <h4 className="title mahal-details-title">Mahallu village<span>{mahal.MahalluVillage}</span></h4>
            <h4 className="title mahal-details-title">mahallu thalook<span>{mahal.MahalluThalook}</span></h4>
            <h4 className="title mahal-details-title">Mahallu district<span>{mahal.MahalluDistrict}</span></h4>
        </div>
        <div className="infobox-wrapper">
          {
            mahalStats.map((data, indx) => (
              <InfoBox data={data} key={indx}/>
            ))
          }
        </div>
        {
          families.length > 0 &&
            <div className="report-families">
              <h4 className="title report-families-title">families under {mahal.MahalluName}:</h4>
              {
                families.filter((item) => {
                  return query.toLowerCase() === '' ? item : item.HeadName?.toLowerCase().includes(query) || item.HouseName?.toLowerCase().includes(query) || item.LandName?.toLowerCase().includes(query) || item.FamilyId?.toLowerCase().includes(query)
                }).map((family, indx) => (
                  <div className="family" key={indx}>
                    <h2 className="family-header">{family.HeadName}'s Family</h2>
                    <h4 className="family-details-title title">Family Head <span>{family.HeadName}</span></h4>
                    <h4 className="family-details-title title">House Name <span>{family.HouseName}</span></h4>
                    <h4 className="family-details-title title">Land Name <span>{family.LandName}</span></h4>
                    <h4 className="family-details-title title">Mahal ID <span>{family.MahalId}</span></h4>
                    <h4 className="family-details-title title">Family ID <span>{family.FamilyId}</span></h4>
                    <h4 className="family-details-title title">Members Count <span>{family.MembersCount}</span></h4>
                    <h4 className="family-details-title title">Ration Category <span>{family.RationCategory}</span></h4>
                    <h4 className="family-details-title title">Email <span>{family.Email}</span></h4>
                    <h4 className="family-details-title title">Phone <span>{family.Phone}</span></h4>
                  </div>
                ))
              }
            </div>
        }
      </div>
    </PDFExport>
    </div>
  )
}

export default MahalReport