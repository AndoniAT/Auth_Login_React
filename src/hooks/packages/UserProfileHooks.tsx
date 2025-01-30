/**
 * Author: Andoni ALONSO TORT
 */

import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAuth from "../useAuth";
import { useEffect, useMemo, useRef, useState } from "react";
import { UserType } from "../../interfaces/User";
import useAxiosPrivate from "../useAxiosPrivate";
import WrapPromise from "../../utils/wrapPromise";
import { AxiosInstance } from "axios";
import { ConnectedUserType, ErrorHandlerHookType, ErrorMessagesType, FormReferencesType, GetUserProfileHookType, InputsType, InputsValueType, ReferencesKeysType, VerifyCriticalChangesHookType } from "../../interfaces/UserProfile";
import { jwtDecode } from "jwt-decode";
import { AccesTokenDecodedType } from "../../interfaces/Auth";
import { ROLES } from "../../AppRoute";
import useLogout from "../useLogout";
import ReconnectModal from "../../components/modals/ReconnectModal";
import useInput from "../useInput";


// == Constants ==
const successFinishMsg = "Some sensitive user information have changed. You will be redirected to login page in... ";

// == Load data ==
const getUser = async ( id:any, _axiosPrivate:AxiosInstance, controller:AbortController ) => {
    return new Promise( ( resolve, reject ) => {
        _axiosPrivate.get( `/api/users/${id}`, {
            signal: controller.signal
        } )
            .then( res => {
                setTimeout( ()=>{
                    resolve( res.data );
                }, 1500 );
            } )
            .catch( err => {
                if( err?.code != "ERR_CANCELED" ) {
                    reject( err );
                }
            } );
    } );
};

// == Init values ==
const errorMessagesInit = {
    gral: '',
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
} as ErrorMessagesType;


/**
 * == HOOKS ==
 */

/**
 * Load user profile data
 * @param id
 */
export function useGetUserProfile() : GetUserProfileHookType {
    const { id } = useParams();
    const [ defaultUser, setDefaultUser ] = useState<UserType | null>( null ); // User initial data
    const axiosPrivate = useAxiosPrivate();
    const [ myUserPromise, setMyUserPromise ] = useState<{read: ()=>any}>();

    useEffect( () => {
        const controller = new AbortController();
        const promise = getUser( id, axiosPrivate, controller );
        const us = WrapPromise( promise );
        setMyUserPromise( us );

        return () => {
            controller.abort();
        };

    }, [ axiosPrivate, id ] );

    useEffect( () => {
        if( myUserPromise?.read ) {
            setDefaultUser( myUserPromise.read );
        }
    }, [ myUserPromise ] );

    return [ defaultUser, setDefaultUser ];
}

/**
 * Get the session user
 */
export function useConnectedUser() : ConnectedUserType {
    const { auth } = useAuth();
    const decoded = auth?.accessToken ? jwtDecode<AccesTokenDecodedType>( auth.accessToken ) : undefined;

    const connectedUser = useMemo( () => {
        return {
            info: decoded?.user,
            isAdmin: decoded?.user ? decoded?.user.roles.includes( ROLES.admin ) : []
        };
    }, [ decoded ] );

    return connectedUser;
}

/**
 * Handling errors to show in update user form
 * @param references of inputs to focus
 * @param setErrMsg function to update the message
 */
export function useHandlerError( references: FormReferencesType ) : ErrorHandlerHookType {
    // == Handling errors ==
    const [ errMsg, setErrMsg ] = useState<ErrorMessagesType>( errorMessagesInit );

    const handler = ( err: any ) => {
        if ( !err.response ) {
            references.findFocus( err );
            setErrMsg( prev => {
                return {
                    ...prev,
                    gral: 'No server response'
                };
            } );
            return;
        }

        const { data } = err.response;
        const { message } = data;
        const found = references.findFocus( message );

        setErrMsg( prev => {
            return {
                ...prev,
                username: message?.username?.message || prev.username,
                firstname: message?.firstname?.message || prev.firstname,
                lastname: message?.lastname?.message || prev.lastname,

                password: message?.password?.message || prev.password,
                confirmPassword: message?.confirmPassword?.message || prev.confirmPassword
            };
        } );

        if ( !found ) {
            setErrMsg( prev => {
                return { ...prev, gral: message };
            } );
        }
    };

    return [ errMsg, setErrMsg, handler ];
}

/**
 * Verify if a sensitive data of user has changed
 * as the username / email / roles
 * and logout if needed
 */
export function useVerifyCritialChanges() : VerifyCriticalChangesHookType {
    //const navigate = useNavigate();
    const [ needToReconnect, setNeedToReconnect ] = useState( "" );
    const navigate = useNavigate();
    const logout = useLogout();

    // => Success
    const [ countSuccess, setCountSuccess ] = useState( 5 );
    const [ successMsg, setSuccessMsg ] = useState( "" );

    useEffect( () => {

        if( needToReconnect && countSuccess >= 0 ) {
            if( countSuccess == 0 ) {
                logout().then( () => {
                    navigate( "/login", { state: { from: { pathname : `/user/${needToReconnect}/profile` } }, replace: true } );
                } );
            }

            const timeout = setTimeout( () => {
                setCountSuccess( prev => {
                    const count = prev - 1;
                    setSuccessMsg( successFinishMsg + count );
                    return count;
                } );
            }, 1000 );


            return () => {
                clearTimeout( timeout );
            };
        }

    }, [ countSuccess, needToReconnect ] );

    const verifyCriticalChanges = ( connectedUser: ConnectedUserType, defaultUser: UserType | null, user: UserType ) => {
    
        const isMyProfile = ( connectedUser.info?.email === defaultUser?.email );
        const emailHasChanged = defaultUser && ( user.email != defaultUser?.email );
        const usernameHasChanged = defaultUser && ( user.username != defaultUser?.username );
        const rightsChanged = !( defaultUser?.roles.every( r => user.roles.includes( r ) ) && user.roles.every( r => defaultUser.roles.includes( r ) ) );
    
        const criticChange = ( usernameHasChanged || emailHasChanged || rightsChanged );
        if( !criticChange ) return;
        
        // == CRITIC CHANGE ==

        if( isMyProfile ) {
            return setNeedToReconnect( user.username );
        }

        // => No my profile

        if ( usernameHasChanged ) {
            return navigate( `/user/${user.username}/profile`, { replace: true } );
        }

    };

    return {
        verifyCriticalChanges,
        reconnect: needToReconnect ? <ReconnectModal header={"Succeeded"} message={successMsg}/> : <></>
    };
}

/**
 * Create References for errors to focus the inputs when needed
 * @returns {Object<FormReferencesType>}
 */
export function useCreateReferences() {
    const references:Record<ReferencesKeysType, React.RefObject<HTMLInputElement>> = {
        success: useRef( null ),
        gralError: useRef( null ),
        username: useRef( null ),
        firstname: useRef( null ),
        lastname: useRef( null ),
        email: useRef( null ),
        password: useRef( null ),
        confirmPassword: useRef( null ),
    }

    const findFocus = function( msg:Record<string, any> ) {
        const attributes:ReferencesKeysType[] = Object.keys( references ) as ReferencesKeysType[];

        let found = false;
        for( const attr of attributes ) {
            found = msg[ attr ];
            
            if( found ) {
                references[ attr ]?.current?.focus();
                break;
            }
        }

        if( !found ) {
            references.gralError?.current?.focus();
        }

        return !!found;
    }


    const refs:FormReferencesType = {
        ...references,
        findFocus
    };

    return refs;
}

/**
 * Inputs needed in user form
 * They store values in local storage
 */
export function useCreateInputs() : [InputsType, ( user:InputsValueType ) => void, () => UserType ] {
    // == States ==
    const [ password, setPassword ] = useState( "" );
    const [ confirmPassword, setConfirmPassword ] = useState( "" );

    // == Local storage inputs ==
    const [ username, usernameReset, usernameAttr ] = useInput( "username", "" );
    const [ firstname, firstnameReset, firstnameAttr ] = useInput( "firstname", "" );
    const [ lastname, lastnameReset, lastnameAttr ] = useInput( "lastname", "" );
    const [ email, emailReset, emailAttr ] = useInput( "email", "" );
    const [ roles, rolesReset, rolesAttr ] = useInput( "roles", "" );

    const inputs = {
        username: { value: username, reset: usernameReset, attr: usernameAttr },
        firstname: { value: firstname, reset: firstnameReset, attr: firstnameAttr },
        lastname: { value: lastname, reset: lastnameReset, attr: lastnameAttr },
        email: { value: email, reset: emailReset, attr: emailAttr },
        roles: { value: roles, reset: rolesReset, attr: rolesAttr },
        password: { value: password, reset: setPassword },
        confirmPassword: { value: confirmPassword, reset: setConfirmPassword, attr: null }
    } as InputsType;

    const resetAll = ( user: InputsValueType ) => {
        inputs.username.reset( user?.username ?? "" );
        inputs.firstname.reset( user?.firstname ?? "" );
        inputs.lastname.reset( user?.lastname ?? "" );
        inputs.email.reset( user?.email ?? "" );
        inputs.roles.reset( user?.roles ?? [] );
        inputs.password.reset( "" );
        inputs.confirmPassword.reset( "" );
    };

    const createUserObject = () => {
        const user = {
            username: inputs.username.value,
            firstname: inputs.firstname.value,
            lastname: inputs.lastname.value,
            email: inputs.email.value,
            roles: inputs.roles.value,
            password: inputs.password.value,
            confirmPassword: inputs.confirmPassword.value
        } as UserType;
        return user;
    };

    return [ inputs, resetAll, createUserObject ];
}