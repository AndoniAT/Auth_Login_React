import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface RolesType {
    allowedRoles: number[]
}

const RequireAuth = ( { allowedRoles } : RolesType ) => {
    const { auth } = useAuth();
    const location = useLocation();

    const userConnected = auth?.user; 
    const hasRoleToAccess = auth?.user?.roles?.find( role => allowedRoles?.includes( role ) );

    return (
            userConnected
                ? hasRoleToAccess
                    ?
                        <Outlet/>
                    :
                    <>
                        {/** If we don't have right we go to the unauthorized page */}
                        <Navigate to="/unauthorized" state={{ from: location }} replace />
                    </>    
                :
                <>
                    {/** If there is no user go back to the login page */}
                    <Navigate to="/login" state={{ from: location }} replace />
                </>
    );
}

export default RequireAuth;