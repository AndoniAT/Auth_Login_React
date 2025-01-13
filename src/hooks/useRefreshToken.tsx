import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";
import { AuthType } from "../interfaces/Auth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    
    const refresh = async() => {
        const response = await axiosPrivate.post( '/api/auth/token' );

        setAuth( ( prev:AuthType ) => {

            return {
                ...prev,
                accessToken: response.data.accessToken
            }
        } );
        
        return response.data.accessToken;
    }
    return refresh
}

export default useRefreshToken;