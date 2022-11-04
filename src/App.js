import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { publicRequest, userReq } from './requestMethods';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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

function App() {
  const [ family, setFamily ] = useState('');
  const [ community, setCommunity ] = useState('');
  const [ admin, setAdmin ] = useState('');
  const [ familyMember, setFamilyMember ] = useState('');
  const [ active, setActive ] = useState(false);

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


  const user = useSelector((state) => state.user );

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
