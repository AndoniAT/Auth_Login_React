import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
    const [ isLoading, setIsLoading ] = useState( true );
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();



    useEffect( () => {
        let isMounted = true;

        const verifyRefreshToken = async() => {
            try {
                await refresh();
            } catch( e ) {
                console.error( e );
            } finally {
                if( isMounted )
                    setIsLoading( false );
            }
        }

        if( !auth?.accessToken ) {
            verifyRefreshToken();
        } else {
            setIsLoading( false );
        }

        return () => {
            isMounted = false;
        }
    }, [] );

    useEffect( () => {
        console.log( 'Is loading state : ', isLoading );
        console.log( 'At : ', JSON.stringify( auth?.accessToken ) );
    },  [ isLoading ])

    return (
        <>
            {
                !persist
                    ? <Outlet/>
                    :
                        isLoading ?
                        <p>Loading...</p>
                        :
                        <Outlet/>
            }
        </>
    )
}

export default PersistLogin;