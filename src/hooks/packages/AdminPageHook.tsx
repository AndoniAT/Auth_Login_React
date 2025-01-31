/**
 * Author: Andoni ALONSO TORT
 */

import { AxiosInstance } from "axios";
import { GetUsersHookType } from "../../interfaces/AdminPage";
import { UserType } from "../../interfaces/User";
import useAxiosPrivate from "../useAxiosPrivate";
import { useEffect, useState } from "react";
import WrapPromise from "../../utils/wrapPromise";

const getUsers = ( _axiosPrivate:AxiosInstance, controller:AbortController ) => {
    return new Promise( ( resolve, reject ) => {
        _axiosPrivate.get( "/api/users", {
            signal: controller.signal
        } )
            .then( res => {
                const users_response = res.data.map( ( us:UserType ) => {
                    const { _id, username, email, firstname, lastname } = us;
                    return { _id, username, email, firstname, lastname };
                } );

                setTimeout( ()=>{
                    resolve( users_response );
                }, 1500 );
            } )
            .catch( err => {
                if( err?.code != "ERR_CANCELED" ) {
                    reject( err );
                }
            } );
    } );
};

/**
 * == HOOKS ==
 */

/**
 * Load users data
 */
export function useGetUsers()  : GetUsersHookType {
    const [ users, setUsers ] = useState<UserType[] | []>( [] ); // User initial data
    const axiosPrivate = useAxiosPrivate();
    const [ myUsersPromise, setMyUsersPromise ] = useState<{read: ()=>any}>();

    useEffect( () => {
        const controller = new AbortController();
        const promise = getUsers( axiosPrivate, controller );

        const usersPromise = WrapPromise( promise );
        setMyUsersPromise( usersPromise );

        return () => {
            controller.abort();
        };

    }, [ axiosPrivate ] );

    useEffect( () => {
        if( myUsersPromise?.read ) {
            setUsers( myUsersPromise.read );
        }
    }, [ myUsersPromise ] );

    return [ users, setUsers ];
}