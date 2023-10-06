
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Nabvar from './components/Nabvar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreateBlog from './pages/CreateBlog';

function App() {
  return (
    <div>
      <Nabvar />
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/createblog' element={<CreateBlog />} />
      </Routes>
    </div>
  );
}

export default App;
