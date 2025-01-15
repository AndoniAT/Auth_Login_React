import { createContext, useState, ReactNode  } from "react";
import { AuthContextType } from "../interfaces/Auth";

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType>( { 
    auth: {}, 
    setAuth: () => {},
    persist: false,
    setPersist: () => false
} );

export const AuthProvider = ( { children } : AuthProviderProps ) => {
    const [ auth, setAuth ] = useState( {} );
    const [ persist, setPersist ] = useState<boolean>( JSON.parse( localStorage.getItem( 'persist' ) || 'false' ) );

    return (
        <AuthContext.Provider value={ { auth, setAuth, persist, setPersist } }>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext; 