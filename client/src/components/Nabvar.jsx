import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../services/operations/authAPI';
function Nabvar() {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    console.log(isLoggedIn);
    async function handelLogout(){
        await dispatch(logout());
    }
    return (
        <div className=' shadow-[0_0_10px_black] h-[70px]'>
            <nav className='flex justify-between max-w-[1180px] pt-4 m-auto'>
                <div className='font-bold text-2xl'>BlogApp</div>
                {
                    isLoggedIn && (
                        <ul className='flex gap-10 uppercase text-lg'>
                            <li className='hover:underline transition-all duration-300'>
                                <Link to={"/blogs"}>Blogs</Link>
                            </li>
                            <li className='hover:underline transition-all duration-300'>
                                <Link to={"/myblogs"}>My Blogs</Link>
                            </li>
                            <li className='hover:underline transition-all duration-300'>
                                <Link to={"/createblog"}>Create Blog</Link>
                            </li>
                        </ul>
                    )
                }
                {
                    !isLoggedIn && (
                        <div className='flex gap-4 text-xl text-white'>
                            <Link to={'/login'}>
                                <button className='bg-red-400 px-4 py-1 rounded-sm cursor-pointer font-semibold hover:bg-red-500 duration-300 transition-all'>Login</button>
                            </Link>
                            <Link to={'/signup'}>
                                <button className='bg-red-400 px-4 py-1 rounded-sm cursor-pointer font-semibold hover:bg-red-500 duration-300 transition-all'>SignUp</button>
                            </Link>
                        </div>
                    )
                }
                {
                    isLoggedIn && (
                        <Link onClick={handelLogout}>
                        <button className='text-white bg-red-400 px-4 py-1 rounded-sm cursor-pointer font-semibold hover:bg-red-500 duration-300 transition-all'>Logout</button>
                    </Link>
                    )
                }
            </nav>
        </div>
    );
}

export default Nabvar;