/**
 * Author: Andoni ALONSO TORT
 */

import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth( {} );
        try {
            await axios( "/api/auth/logout",  {
                withCredentials: true
            } );
        } catch( e ) {
            console.error( e );
        }
    };

    return logout;
};

export default useLogout;