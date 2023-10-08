
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Nabvar from './components/Nabvar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreateBlog from './pages/CreateBlog';
import MyBlogs from './pages/MyBlogs';
import { useSelector } from 'react-redux';

function App() {

  const { checkEdit } = useSelector((state) => state.blog)
  console.log(checkEdit)
  return (
    <div>
      <Nabvar />
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        {
          checkEdit
            ?
            (
              <Route path='/editblog' element={<CreateBlog />} />
            )
            :
            (
              <Route path='/createblog' element={<CreateBlog />} />
            )
        }
        <Route path='/myblogs' element={<MyBlogs />} />
      </Routes>
    </div>
  );
}

export default App;
