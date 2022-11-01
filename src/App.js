import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Pages
import Dashboard from './Pages/Dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
