import './UserDetails.scss';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DetailsCard from '../../Components/DetailsCard/DetailsCard';
import { userReq } from '../../requestMethods';
import PrimaryButton from '../../Components/PrimaryButton/PrimaryButton';

const UserDetails = () => {
    const [data, setData] = useState({});
    const [ status, setStatus ] = useState('');
    const [ error, setError ] = useState('');
    const location = useLocation();
    const id = location.pathname.split('/')[3];

    useEffect(() => {
        const getDetails = async () => {
            try {
                const details = await userReq(`/user/${id}`)
                setData(details.data.data.user)
            } catch (err) {
                console.log(err);
            }
        }
        getDetails();
    }, [id]);

    const handleClick = async () => {
        if (status === '') {
            setError("Select a value");
            return
        }
        try {
            const result = await userReq.put(`/user/update/${id}`, {Status: status});
            result.data.data.data && window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <div className='user-details default'>
        <h2 className="header section-header">user details</h2>
        <DetailsCard member={data}/>
        <form action="" className="status-form">
            <p className="text-regular">Current User Status: <span className={`${data.Status}`}>{data.Status}</span></p>
            <select className='input' required onChange={(e) => setStatus(e.target.value)}>
                <option value="">Select Status</option>
                <option value="Enabled">Enable</option>
                <option value="Disabled">Disbale</option>
            </select>
            {
                error &&
                    <p className="error-message">{error}</p>
            }
            <PrimaryButton text={"Update Status"} handleClick={handleClick}/>
        </form>
    </div>
  )
}

export default UserDetails