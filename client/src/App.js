
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Nabvar from './components/Nabvar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreateBlog from './pages/CreateBlog';
import MyBlogs from './pages/MyBlogs';

function App() {
  return (
    <div>
      <Nabvar />
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/createblog' element={<CreateBlog />} />
        <Route path='/myblogs' element={<MyBlogs />} />
      </Routes>
    </div>
  );
}

export default App;
