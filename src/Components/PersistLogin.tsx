/**
 * Author: Andoni ALONSO TORT
 */

import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";
import useLogout from "../hooks/useLogout";

const PersistLogin = () => {
    const [ isLoading, setIsLoading ] = useState( true );
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const [ persist ] = useLocalStorage( "persist", false );
    const logout = useLogout();

    const signOut = async() => {
        await logout();
    };

    useEffect( () => {
        let isMounted = true;

        const verifyRefreshToken = async() => {
            try {
                if( persist ) {
                    await refresh();
                } else {
                    signOut();
                }
            } catch( e ) {
                console.error( e );
            } finally {
                if( isMounted )
                    setIsLoading( false );
            }
        };

        if( !auth?.accessToken ) {
            if( persist ) {
                verifyRefreshToken();
            } else {
                signOut();
            }
        } else {
            setIsLoading( false );
        }

        return () => {
            isMounted = false;
        };
    }, [] );

    useEffect( () => {
        console.log( "Is loading state : ", isLoading );
    },  [ isLoading ] );

    return (
        <>
            {
                !persist
                    ? <Outlet/>
                    :
                    isLoading ?

                    /*
                            <p>Loading...</p>
                            */
                        <></>
                        :
                        <Outlet/>
            }
        </>
    );
};

export default PersistLogin;