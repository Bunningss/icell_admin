import PrimaryButton from '../../Components/PrimaryButton/PrimaryButton';
import './Members.scss';
import { useEffect, useState, useRef } from 'react';
import { userReq } from '../../requestMethods';
import { PDFExport } from '@progress/kendo-react-pdf';

const Members = () => {
    const [ uurl, setUurl ] = useState('')
    const [ members, setMembers ] = useState([]);
    const [ query, setQuery ] = useState({
        name: '',
        mahalId: '',
        familyId: '',
        gender: '',
        maritalStatus: '',
        welfareBeneficiary: ''
    });

  const pdfExportComponent = useRef(null);

    useEffect(() => {
        const getMembers = async () => {
            const memb = await userReq.get('/family/allmembers')
            setMembers(memb.data.data.data.members
                .filter((item) => { return query.name.toLowerCase() === '' ? item : item.MemberName?.toLowerCase().includes(query.name.toLowerCase()) })
                .filter((item) => { return query.mahalId.toLowerCase() === '' ? item : item.MahalId?.toLowerCase().includes(query.mahalId.toLowerCase()) })
                .filter((item) => { return query.familyId.toLowerCase() === '' ? item : item.FamilyId?.toLowerCase().includes(query.familyId.toLowerCase()) })
                .filter((item) => { return query.gender.toLowerCase() === '' ? item : item.Gender?.toLowerCase().includes(query.gender.toLowerCase()) })
                .filter((item) => { return query.maritalStatus.toLowerCase() === '' ? item : item.MaritalStatus?.toLowerCase().includes(query.maritalStatus.toLowerCase()) })
                .filter((item) => { return query.welfareBeneficiary.toLowerCase() === '' ? item : item.WelfareSchemeBeneficiary?.toLowerCase().includes(query.welfareBeneficiary.toLowerCase()) }))
        };
        getMembers();
    }, [query]);

const handleClick = () => {
    pdfExportComponent.current.save();
};

// Create CSV
let objUrl;
const getCsv = () => {
    let newArr = []
    const headers = Object.keys(members[0])
    newArr.push(headers)

    members.forEach((member) => {
        newArr.push(Object.values(member))
    })

    let csv = ''

    newArr.forEach((row) => {
        csv += row.join(',') + '\n'
    })

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8,' })
    objUrl = URL.createObjectURL(blob)
    setUurl(objUrl)
}

  return (
    <div className='members default'>
        <div className="members-filter">
            <input type="text" className="input members-input" placeholder='Search by Name' onChange={(e) => setQuery({ ...query, ['name']: e.target.value})} />
            <input type="text" className="input members-input" placeholder='Search by MahalID' onChange={(e) => setQuery({ ...query, ['mahalId']: e.target.value})} />
            <input type="text" className="input members-input" placeholder='Search by FamilyID' onChange={(e) => setQuery({ ...query, ['familyId']: e.target.value})} />
            <input type="text" className="input members-input" placeholder='Search by Gender' onChange={(e) => setQuery({ ...query, ['gender']: e.target.value})} />
            <input type="text" className="input members-input" placeholder='Search by Marital Status' onChange={(e) => setQuery({ ...query, ['maritalStatus']: e.target.value})} />
            <input type="text" className="input members-input" placeholder='Search by Welfare Scheme Beneficiary' onChange={(e) => setQuery({ ...query, ['welfareBeneficiary']: e.target.value})} />
        </div>
        <div className="btn-wrapper">
            <PrimaryButton text={'Download as PDF'} handleClick={handleClick}/>
            {
                members.length > 0 &&
                    <a className='csv-download' href={uurl} onClick={getCsv} download='members.csv'>download as CSV</a>
            }
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
                        members.map((member, indx) => (
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