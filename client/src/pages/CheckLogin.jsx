import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function CheckLogin() {
    const { isLoggedIn } = useSelector((state) => state.auth);
    return (
        <>
            {
                isLoggedIn && (
                    <Outlet />
                )
            }
        </>
    );
}

export default CheckLogin;