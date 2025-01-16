import axios from "../api/axios";
import useAuth from "./useAuth";
import { AuthType } from "../interfaces/Auth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    
    const refresh = async() => {
        const response = await axios.get( '/api/auth/token', {
            withCredentials: true
        } );

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