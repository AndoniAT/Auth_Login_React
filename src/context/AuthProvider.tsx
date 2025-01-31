/**
 * Author: Andoni ALONSO TORT
 */

import { createContext, useState, ReactNode  } from "react";
import { AuthContextType } from "../interfaces/Auth";

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType>( {
    auth: {},
    setAuth: () => {},
    /*persist: false,
    setPersist: () => false*/
} );

export const AuthProvider = ( { children } : AuthProviderProps ) => {
    const [ auth, setAuth ] = useState( {} );
    //const item = localStorage.getItem( 'persist' );
    //const [ persist, setPersist ] = useState<boolean>( item ? JSON.parse( item ) : false );

    return (
        <AuthContext.Provider value={ { auth, setAuth } }>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthContext;