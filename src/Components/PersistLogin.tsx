import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
    const [ isLoading, setIsLoading ] = useState( true );
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect( () => {
        const verifyRefreshToken = async() => {
            try {
                await refresh();
            } catch( e ) {
                console.error( e );
            } finally {
                setIsLoading( false );
            }
        }

        if( !auth?.accessToken ) {
            verifyRefreshToken();
        } else {
            setIsLoading( false );
        }

    }, [] );

    useEffect( () => {
        console.log( 'Is loading state : ', isLoading );
        console.log( 'At : ', JSON.stringify( auth?.accessToken ) );
    },  [ isLoading ])

    return (
        <>
            {   
                isLoading ?
                    <p>Loading...</p>
                :
                    <Outlet/>
            }
        </>
    )
}

export default PersistLogin;