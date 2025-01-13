import { createContext, useState, ReactNode  } from "react";
import { AuthContextType } from "../interfaces/Auth";

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType>( { auth: {}, setAuth: () => {} } );

export const AuthProvider = ( { children } : AuthProviderProps ) => {
    const [ auth, setAuth ] = useState( {} );

    return (
        <AuthContext.Provider value={ { auth, setAuth } }>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext; 