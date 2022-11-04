import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { publicRequest } from './requestMethods';
import { useEffect, useState } from 'react';

import Sidebar from './Components/Sidebar/Sidebar';
// Pages
import Dashboard from './Pages/Dashboard/Dashboard';
import Families from './Pages/Families/Families';
import Communities from './Pages/Communities/Communities';
import Users from './Pages/Users/Users';
import ViewFamily from './Pages/ViewFamily/ViewFamily';
import Login from './Pages/Login/Login';
import MahalDetails from './Pages/MahalDetails/MahalDetails';
import UserDetails from './Pages/UserDetails/UserDetails';
import { useSelector } from 'react-redux';

function App() {
  const [ family, setFamily ] = useState('');
  const [ community, setCommunity ] = useState('');
  const [ admin, setAdmin ] = useState('');
  const [ familyMember, setFamilyMember ] = useState('');

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
    number: ''
  },
  {
    title: "Communities",
    number: community
  },
]

useEffect(() => {
  const getInfos = async () => {
    try {
      const admins = await publicRequest.get("user/getall")
      setAdmin(admins.data.data.users.length)

      const families = await publicRequest.get("family/details/info");
      setFamily(families.data.data.data.families.length)

      const communities = await publicRequest.get('/mahal/ids')
      setCommunity(communities.data.data.data.ids.length)
    } catch (err) {
      console.log(err)
    }
  };
  getInfos();
}, []);


  const user = useSelector((state) => state.user );

  return (
    <BrowserRouter>
    <div style={{ display: 'flex'}}>
      <div style={{ flex: '1' }}>
        <Sidebar/>
      </div>
      <div style={{ flex:"5"}}>
        <Routes>
          {
            user.currentUser &&
            <>
              <Route exact path='/' element={<Dashboard toolboxData={toolboxData}/>} />
              <Route exact path='/users' element={<Users/>}/>
              <Route exact path='/communities' element={<Communities/>}/>
              <Route exact path='/families' element={<Families/>}/>
              <Route exact path='/families/:id' element={<ViewFamily/>}/>
              <Route exact path='/mahal/details/:id' element={<MahalDetails/>}/>
              <Route exact path='/user/details/:id' element={<UserDetails/>}/>
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
