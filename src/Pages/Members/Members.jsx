import PrimaryButton from '../../Components/PrimaryButton/PrimaryButton';
import './Members.scss';
import { useEffect, useState, useRef } from 'react';
import { userReq } from '../../requestMethods';
import { PDFExport } from '@progress/kendo-react-pdf';

const Members = () => {
    const [ members, setMembers ] = useState([]);
    const [ query, setQuery ] = useState('');


  const pdfExportComponent = useRef(null);

    useEffect(() => {
        const getMembers = async () => {
            const memb = await userReq.get('/family/allmembers')
            setMembers(memb.data.data.data.members)
        };
        getMembers();
    }, []);

const handleClick = () => {
    pdfExportComponent.current.save();
};

  return (
    <div className='members default'>
        <div className="members-filter">
            <input type="text" className="input members-input" placeholder='Search by Name, Family ID, Mahal ID, Gender' onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="btn-wrapper">
            <PrimaryButton text={'Download as PDF'} handleClick={handleClick}/>
        </div>
        <div className="members-wrapper">
            <PDFExport ref={pdfExportComponent} paperSize='A2'>
            <table>
                <thead>
                    <tr>
                        <th>Member Name</th>
                        <th>Family ID</th>
                        <th>Mahal ID</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        members.filter((item) => {
                            return query.toLowerCase() === '' ? item : item.MemberName?.toLowerCase().includes(query) || item.FamilyId?.toLowerCase().includes(query) || item.MahalId?.toLowerCase().includes(query) || item.Gender?.toLowerCase().includes(query)
                        }).map((member, indx) => (
                            <tr key={indx}>
                                <td>{member.MemberName}</td>
                                <td>{member.FamilyId}</td>
                                <td>{member.MahalId}</td>
                                <td>{member.Gender}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            </PDFExport>
        </div>
    </div>
  )
}

export default Members