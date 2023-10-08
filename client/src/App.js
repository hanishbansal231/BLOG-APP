
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Nabvar from './components/Nabvar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreateBlog from './pages/CreateBlog';
import MyBlogs from './pages/MyBlogs';
import { useSelector } from 'react-redux';
import Blog from './pages/Blog';
import CheckLogin from './pages/CheckLogin';

function App() {

  const { checkEdit } = useSelector((state) => state.blog)
  const { isLoggedIn } = useSelector((state) => state.auth)
  return (
    <div>
      <Nabvar />
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route element={<CheckLogin />}>
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
          <Route path='/blogs' element={<Blog />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
