import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

/**
 * 
 * @returns {Object{ auth, setAuth }}
 */
const useAuth = () => {
    return useContext( AuthContext );
}

export default useAuth;