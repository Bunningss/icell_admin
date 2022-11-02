import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';

// Pages
import Dashboard from './Pages/Dashboard/Dashboard';
import Families from './Pages/Families/Families';
import Communities from './Pages/Communities/Communities';
import Users from './Pages/Users/Users';
import User from './Pages/User/User';

function App() {
  return (
    <BrowserRouter>
    <div style={{ display: 'flex'}}>
      <div style={{ flex: '1' }}>
        <Sidebar/>
      </div>
      <div style={{ flex:"5"}}>
        <Routes>
          <Route exact path='/' element={<Dashboard/>} />
          <Route exact path='/users' element={<Users/>}/>
          <Route exact path='/user/:id' element={<User/>}/>
          <Route exact path='/communities' element={<Communities/>}/>
          <Route exact path='/families' element={<Families/>}/>
        </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
