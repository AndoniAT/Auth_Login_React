import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from 'jwt-decode';
import { AccesTokenDecodedType } from "../interfaces/Auth";

interface RequireAuthTypes {
    allowedRoles: number[],
    authRequired?: boolean
}

const RequireAuth = ( { allowedRoles, authRequired = true } : RequireAuthTypes ) => {
    const { auth } = useAuth();
    const location = useLocation();
    const decoded = auth?.accessToken ? jwtDecode<AccesTokenDecodedType>( auth.accessToken ) : undefined;
    const userConnected = decoded?.user;
    const roles = userConnected ? userConnected.roles : [];

    const hasRoleToAccess = ( allowedRoles.length > 0 ) ? roles?.find( ( role:number ) => allowedRoles?.includes( role ) ) : true;

    return (
            !authRequired
                ?
                    userConnected ? <Navigate to="/" replace /> : <Outlet/>
            :
                ( userConnected  )
                ?
                    ( hasRoleToAccess )
                    ?
                        <Outlet/>
                    :
                        <>
                            {/** If we don't have right we go to the unauthorized page */}
                            <Navigate to="/unauthorized" state={{ from: location }} replace />
                        </>
                :
                    <>
                        {
                            <Navigate to="/login" state={{ from: location }} replace />
                        }
                    </>

    );
}

export default RequireAuth;