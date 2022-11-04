import { Link } from 'react-router-dom';
import './MobileSidebar.scss';

const MobileSidebar = ({ active, setActive }) => {
  return (
    <div onClick={() => setActive(false)} className={active ? 'm-sidebar active default' : 'm-sidebar'}>
        <ul className="m-sidebar-list" >
            <Link to='/users'>
                <li className="m-sidebar-list-item">Users</li>
            </Link>
            <Link to='/communities'>
                <li className="m-sidebar-list-item">Communities</li>
            </Link>
            <Link to='/families'>
                <li className="m-sidebar-list-item">Families</li>
            </Link>
            <Link to='/communities/new'>
                <li className="m-sidebar-list-item">Add New Mahal</li>
            </Link>
        </ul>
    </div>
  )
}

export default MobileSidebar