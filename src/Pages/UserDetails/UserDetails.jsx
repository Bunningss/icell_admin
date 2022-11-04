import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DetailsCard from '../../Components/DetailsCard/DetailsCard';
import { publicRequest } from '../../requestMethods';
import './UserDetails.scss';

const UserDetails = () => {
    const [data, setData] = useState({})
    const location = useLocation();
    const id = location.pathname.split('/')[3];

    useEffect(() => {
        const getDetails = async () => {
            try {
                const details = await publicRequest(`/user/${id}`)
                setData(details.data.data.user)
            } catch (err) {
                console.log(err);
            }
        }
        getDetails();
    }, [])

  return (
    <div className='user-details default'>
        <h2 className="header section-header">user details</h2>
        <DetailsCard member={data}/>
    </div>
  )
}

export default UserDetails