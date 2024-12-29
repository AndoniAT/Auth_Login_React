import { createContext, useState, ReactNode  } from "react";

interface UserType {
    firstname: string,
    lastname: string,
    email: string,
    password?: string
}

interface AuthType {
    user: UserType,
    accessToken: string,
    refreshToken: string    
}

interface AuthContextType {
    auth: AuthType;
    setAuth: ( auth: object ) => void;
}

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