
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Nabvar from './components/Nabvar';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <Nabvar />
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
