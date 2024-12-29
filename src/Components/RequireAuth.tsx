import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.user
            ?
                <Outlet/>
            :
            <>
                {/** If there is no user go back to the login page */}
                <Navigate to="/login" state={{ from: location }} replace />
            </>
    );
}

export default RequireAuth;