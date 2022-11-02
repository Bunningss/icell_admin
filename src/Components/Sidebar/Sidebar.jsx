import './Sidebar.scss';
import { Link } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="col">
            <Link to='/'>
                <h2 className="logo title">icell</h2>
            </Link>
        </div>
        <div className="col">
            <ul className="sidebar-list">
                <li className="list-item">
                    <Link to='/users'>
                        <AccountCircleIcon className='icon text-regular'/>
                        <p className='text-regular sidebar-list-text'>Users</p>
                    </Link>
                </li>
                <li className="list-item">
                    <Link to='/communities'>
                        <PeopleIcon className='icon text-regular'/>
                        <p className='text-regular sidebar-list-text'>View communities</p>
                    </Link>
                </li>
                <li className="list-item">
                    <Link to='/families'>
                        <FamilyRestroomIcon className='icon text-regular'/>
                        <p className='text-regular sidebar-list-text'>view families</p>
                    </Link>
                </li>
            </ul>
            <div className="logout-wrapper">
                <LogoutIcon className='text-regular icon'/>
                <p className="text-regular logout">Logout</p>
            </div>
        </div>
    </div>
  )
}

export default Sidebar