import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { publicRequest, userReq } from './requestMethods';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { logout } from './Redux/userRedux';

import Sidebar from './Components/Sidebar/Sidebar';
import Hamburger from './Components/Hamburger/Hamburger';
import MobileSidebar from './Components/MobileSidebar/MobileSidebar';
// Pages
import Dashboard from './Pages/Dashboard/Dashboard';
import Families from './Pages/Families/Families';
import Communities from './Pages/Communities/Communities';
import Users from './Pages/Users/Users';
import ViewFamily from './Pages/ViewFamily/ViewFamily';
import Login from './Pages/Login/Login';
import MahalDetails from './Pages/MahalDetails/MahalDetails';
import UserDetails from './Pages/UserDetails/UserDetails';
import NewMahal from './Pages/NewMahal/NewMahal';
import Report from './Pages/Report/Report';
import MahalReport from './Pages/MahalReport/MahalReport';
import Members from './Pages/Members/Members';

function App() {
  const [ family, setFamily ] = useState('');
  const [ community, setCommunity ] = useState('');
  const [ admin, setAdmin ] = useState('');
  const [ familyMember, setFamilyMember ] = useState('');
  const [ active, setActive ] = useState(false);

  const dispatch = useDispatch();

  const toolboxData = [
  {
    title: "Community Admins",
    number: admin
  },
  {
    title: "Families",
    number: family
  },
  {
    title: "family members",
    number: familyMember
  },
  {
    title: "Communities",
    number: community
  },
]

useEffect(() => {
  const getInfos = async () => {
    try {
      const admins = await userReq.get("user/getall")
      setAdmin(admins.data.data.users.length)

      const families = await userReq.get("family/details/info");
      setFamily(families.data.data.data.families.length)

      const communities = await publicRequest.get('/mahal/ids')
      setCommunity(communities.data.data.data.ids.length)

      const familymemb = await userReq.get('family/allmembers')
      setFamilyMember(familymemb.data.data.data.members.length)
    } catch (err) {
      console.log(err)
    }
  };
  getInfos();
}, []);


  const user = useSelector((state) => state.user);
// Auto Logout
  if (user?.currentUser?.token) {
    const decoded = jwt_decode(user?.currentUser?.token)
    if (decoded.exp * 1000 < Date.now()) {
      dispatch(logout())
    };
  };

  return (
    <BrowserRouter>
    <Hamburger active={active} setActive={setActive}/>
    <MobileSidebar active={active} setActive={setActive}/>
    <div style={{ display: 'flex'}}>
      <div className='no-flex'>
        <Sidebar/>
      </div>
      <div style={{ flex:"5"}}>
        <Routes>
            <Route exact path='/' element={ user.currentUser ? <Dashboard toolboxData={toolboxData}/> : <Login/> } />
          {
            user.currentUser &&
            <>
              <Route exact path='/users' element={<Users/>}/>
              <Route exact path='/communities' element={<Communities/>}/>
              <Route exact path='/families' element={<Families/>}/>
              <Route exact path='/families/:id' element={<ViewFamily/>}/>
              <Route exact path='/mahal/details/:id' element={<MahalDetails/>}/>
              <Route exact path='/user/details/:id' element={<UserDetails/>}/>
              <Route exact path='/communities/new' element={<NewMahal/>}/>
              <Route exact path='/mahalreport' element={<Report/>}/>
              <Route exact path='/mahalreport/:id' element={<MahalReport/>}/>
              <Route exact path='/familymembers' element={<Members/>}/>
            </>
          }
          {
            !user.currentUser &&
            <Route exact path='/login' element={<Login/>} />
          }
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
