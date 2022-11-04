import './MahalDetails.scss';
import DetailsCard from '../../Components/DetailsCard/DetailsCard';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { publicRequest } from '../../requestMethods';

const MahalDetails = () => {
    const [ data, setData ] = useState({})
    const location = useLocation();
    const id = location.pathname.split('/')[3];
    
    useEffect(() => {
        const getDetails = async () => {
            try {
                const details = await publicRequest.get(`/mahal/view/${id}`)
                setData(details.data.data.data.mahalDetails[0])
            }catch (err) {
                console.log(err)
            }
        }
        getDetails();
    }, []);

  return (
    <div className='details default'>
        <h2 className="header section-header">Mahallu details</h2>
        <DetailsCard member={data}/>
    </div>
  )
}

export default MahalDetails