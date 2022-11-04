import './Sidebar.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/userRedux';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import logo from '../../images/logo.png';

const Sidebar = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logout())
    };
    
  return (
    <div className='sidebar'>
        <div className="col">
            <Link to='/'>
                <img src={logo} alt="" className="logo" />
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
                        <p className='text-regular sidebar-list-text'>View Mahals</p>
                    </Link>
                </li>
                <li className="list-item">
                    <Link to='/families'>
                        <FamilyRestroomIcon className='icon text-regular'/>
                        <p className='text-regular sidebar-list-text'>view families</p>
                    </Link>
                </li>
            </ul>
            {/* Add New */}
            {
                user.currentUser &&
                <ul className="sidebar-list">
                    <li className="list-item">
                        <Link to='/communities/new'>
                            <PeopleIcon className='text-regular icon'/>
                            <p className="text-regular sidebar-list-text">add new mahal</p>
                        </Link>
                    </li>
                </ul>
            }
            <div className="logout-wrapper">
                {
                    user.currentUser ?
                    <div onClick={handleLogout}>
                        <LogoutIcon className='text-regular icon'/>
                        <p className="text-regular logout">Logout</p>
                    </div> :
                    <Link to='/login'>
                        <LoginIcon className='text-regular icon'/>
                        <p className="text-regular logout">Login</p>
                    </Link>
                }
            </div>
        </div>
    </div>
  )
}

export default Sidebar