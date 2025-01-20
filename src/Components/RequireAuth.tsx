import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from 'jwt-decode';
import { AccesTokenDecodedType } from "../interfaces/Auth";

interface RolesType {
    allowedRoles: number[]
}

const RequireAuth = ( { allowedRoles } : RolesType ) => {
    const { auth } = useAuth();
    const location = useLocation();
    const decoded = auth?.accessToken ? jwtDecode<AccesTokenDecodedType>( auth.accessToken ) : undefined;
    const userConnected = decoded?.user;
    const roles = userConnected ? userConnected.roles : [];

    const hasRoleToAccess = roles?.find( ( role:number ) => allowedRoles?.includes( role ) );
    console.log( 'user connected', userConnected );
    console.log( 'has acces', hasRoleToAccess );
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