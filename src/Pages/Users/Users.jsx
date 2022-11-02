import './Users.scss';
import { userColumns, userAction } from '../../static';
import Datatable from '../../Components/datatable/Datatable';
import { useEffect, useState } from 'react';
import { publicRequest } from '../../requestMethods';

const Users = () => {
  const [ userRows, setUserRows ] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await publicRequest.get('user/getall')
        setUserRows(users.data.data.users)
      } catch (err) {
        console.log(err)
      }
    };
    getUsers();
  }, []);

  return (
    <div className='users'>
      <h2 className="header user-header">All Users</h2>
      <Datatable dataColumns={userColumns} dataRows={userRows} actionColumn={userAction}/>
    </div>
  )
}

export default Users