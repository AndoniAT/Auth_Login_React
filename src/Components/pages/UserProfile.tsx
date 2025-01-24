import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useMemo, useRef, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { UserType } from "../../interfaces/User";
import { ChatBubbleBottomCenterTextIcon, EyeIcon, EyeSlashIcon, PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { jwtDecode } from "jwt-decode";
import { ROLES } from "../../AppRoute";
import { AccesTokenDecodedType } from "../../interfaces/Auth";
import useInput from "../../hooks/useInput";
import ReconnectModal from "../modals/ReconnectModal";
import useLogout from "../../hooks/useLogout";

const UserProfile = () => {
    const { id } = useParams();
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const logout = useLogout();

    // Local storage inputs
    const [ username, usernameReset, usernameAttr ] = useInput( 'firstname', 'ando' );
    const [ firstname, firstnameReset, firstnameAttr ] = useInput( 'firstname', 'ando' );
    const [ lastname, lastnameReset, lastnameAttr ] = useInput( 'lastname', '' );
    const [ email, emailReset, emailAttr ] = useInput( 'email', '' );
    const [ roles, rolesReset, rolesAttr ] = useInput( 'roles', '' );

    // States
    const [ password, setPassword ] = useState( '' );
    const [ confirmPassword, setConfirmPassword ] = useState( '' );
    const [ typePassword, setTypePassword ] = useState( true );
    const [ typeConfirmPassword, setTypeConfirmPassword ] = useState( true );

    // => Success states
    const [ countSuccess, setCountSuccess ] = useState( 5 );
    const [ successMsg, setSuccessMsg ] = useState( '' );
    const [ needToReconnect, setNeedToReconnect ] = useState( false );

    const inputs = useMemo( () => {
        return {
            username: { value: username, reset: usernameReset, attr: usernameAttr },
            firstname: { value: firstname, reset: firstnameReset, attr: firstnameAttr },
            lastname: { value: lastname, reset: lastnameReset, attr: lastnameAttr },
            email: { value: email, reset: emailReset, attr: emailAttr },
            roles: { value: roles, reset: rolesReset, attr: rolesAttr },
            password: { value: password, reset: setPassword },
            confirmPassword: { value: confirmPassword, reset: setConfirmPassword, attr: null }
        }
     }, [ email, emailAttr, emailReset,
          username, usernameAttr, usernameReset,
          firstname, firstnameAttr, firstnameReset,
          lastname, lastnameAttr, lastnameReset,
          roles, rolesAttr, rolesReset,
          password, setPassword,
          confirmPassword, setConfirmPassword
        ] );

    // States
    const [ loaded, setLoaded ] = useState( false );
    const [ isMe, setIsMe ] = useState( false );
    const [ editMode, setEditMode ] = useState( false );
    const [ defaultUser, setDefaultUser ] = useState<UserType | null>( null );

    // References
    const references = {
        success: useRef<HTMLDivElement>( null ),
        gralError: useRef<HTMLDivElement>( null ),
        username: useRef<HTMLInputElement>( null ),
        firstname: useRef<HTMLInputElement>( null ),
        lastname: useRef<HTMLInputElement>( null ),
        email: useRef<HTMLInputElement>( null ),
        password: useRef<HTMLInputElement>( null ),
        confirmPassword: useRef<HTMLInputElement>( null )
    };

    // Handling errors
    const [ errMsg, setErrMsg ] = useState( {
        gral: '',
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    } );

    const updateHandlerError = ( err:any ) => {

        if( !err.response ) {
            setErrMsg( prev => {
                 return {
                     ...prev,
                     gral: 'No server response'
                 }
            } );
            return;
         }

         const { data } = err.response;
         const { message } = data;

         setErrMsg( prev => {
            return {
                ...prev,
                username: message?.username?.message || prev.username,
                firstname: message?.firstname?.message || prev.firstname,
                lastname: message?.lastname?.message || prev.lastname,
                email: message?.email?.message || prev.email,
                password: message?.password?.message || prev.password,
                confirmPassword: message?.confirmPassword?.message || prev.confirmPassword
            }
        } );

        if( message.username ) {
            references.username.current?.focus();
        } else if( message.firstname ) {
            references.firstname.current?.focus();
        } else if( message.lastname ) {
            references.lastname.current?.focus();
        } else if( message.email ) {
            references.email.current?.focus();
        } else if( message.password ) {
            references.password.current?.focus();
        } else if( message.confirmPassword ) {
            references.confirmPassword.current?.focus();
        } else {
            setErrMsg( prev => {
                return { ...prev, gral: message };
            } );
            references.gralError?.current?.focus();
        }
    };

    // JWT => Session info
    const decoded = auth?.accessToken ? jwtDecode<AccesTokenDecodedType>( auth.accessToken ) : undefined;

    const connectedUser = useMemo(() => {
        return {
            info: decoded?.user,
            isAdmin: decoded?.user ? decoded?.user.roles.includes( ROLES.admin ) : []
        }
    }, [ decoded ] );

    // UseEffect

    useEffect( () => {
        const controller = new AbortController();
        let isMounted = true;

        const getUser = async () => {
            axiosPrivate.get( `/api/users/${id}`, {
                signal: controller.signal
            } )
            .then( ( res:any ) => {
                if( isMounted ) {
                    const { username, firstname, lastname, email, roles } = res.data;

                    inputs.username.reset( username );
                    inputs.firstname.reset( firstname );
                    inputs.lastname.reset( lastname );
                    inputs.email.reset( email );
                    inputs.roles.reset( roles );

                    setDefaultUser( { username, firstname, lastname, email, roles } );

                    if( email === connectedUser?.info?.email ) {
                        setIsMe( true );
                    }

                    setLoaded( true );
                }
            } )
            .catch( ( e:any ) => {
                if( e?.code == 'ERR_CANCELED' ) {
                    console.log( 'Request aborted !', e );
                } else {
                    console.error( "Error getting user ! ", e );
                    navigate('/login' );
                }
            } );
        };

        getUser();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [ axiosPrivate, id, navigate ] );

    useEffect( () => {
        setErrMsg( prev => {
            return { ...prev, gral: '', username: '', firstname: '', lastname: '', email: '', password: '', confirmPassword: '' };
        } );
    }, [ inputs.username.value, inputs.firstname.value, inputs.lastname.value, setErrMsg ] );

    const successFinishMsg = 'Some sensitive user information have changed. You will be redirected to login page in... ';

    useEffect( () => {

        if( needToReconnect ) {
            const timeout = setTimeout( () => {
                setCountSuccess( prev => {
                    const count = prev - 1;
                    setSuccessMsg( successFinishMsg + count );
                    return count;
                } );
            }, 1000 );

            if( countSuccess <= 0 ) {
                logout();
            }

            return () => {
                clearTimeout(timeout);
            }
        }

    }, [ countSuccess, needToReconnect ] );

    // HANDLERS

    // => Save
    const handlerSave = () => {
        const user = {
            username: inputs.username.value,
            firstname: inputs.firstname.value,
            lastname: inputs.lastname.value,
            email: inputs.email.value,
            roles: inputs.roles.value,
            password: inputs.password.value
        } as UserType;

        if( id ) {
            const data = { ... user, confirmPassword: inputs.confirmPassword.value };
            axiosPrivate.put( `/api/users/${id}`, data, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            } )
            .then( async () => {
                if( user.password )
                delete user?.password;

                const isMyProfile = ( connectedUser.info?.email === defaultUser?.email );
                const emailHasChanged = defaultUser && ( user.email != defaultUser?.email );
                const usernameHasChanged = defaultUser && ( user.username != defaultUser?.username );
                const rightsChanged = !( defaultUser?.roles.every( r => user.roles.includes( r ) ) && user.roles.every( r => defaultUser.roles.includes( r ) ) );

                const criticChange = ( usernameHasChanged || emailHasChanged || rightsChanged );
                if( criticChange ) {
                    if( isMyProfile ) {
                        setNeedToReconnect( true );
                    } else if( usernameHasChanged ){
                        navigate( `/user/${user.username}/profile` );
                    }

                }

                setDefaultUser( user );
                setPassword( '' );
                setConfirmPassword( '' );
                setEditMode( !editMode );

            } )
            .catch( updateHandlerError );
        }

    };

    // => Cancel
    const handlerCancel = () => {
        if( defaultUser ) {
            inputs.username.reset( defaultUser.username );
            inputs.firstname.reset( defaultUser.firstname );
            inputs.lastname.reset( defaultUser.lastname );
            inputs.email.reset( defaultUser.email );
            inputs.roles.reset( defaultUser.roles );
            inputs.password.reset( '' );
            inputs.confirmPassword.reset( '' );
            setEditMode( !editMode );
        }
    };

    return (
        <div className="bg-slate-400 flex">
            {
                /* Profile form / information section */
                loaded ?
                    <>
                    <div className="profileUserContainer bg-slate-300 w-5/12 min-h-fit h-screen p-y-10 block">
                        <h3 className="text-center text-2xl pt-5 pb-5 font-bold">Profile</h3>
                        {
                            editMode
                            ?
                                <div className="w-full text-center">
                                    <p ref={references.gralError} className={errMsg ? "errmsg error-message" : "offscreen"} aria-live="assertive">{errMsg.gral}</p>
                                </div>
                            :
                                <></>
                        }
                        {
                            <div className="profileInfoContainter bg-slate-300 rounded-lg border-black h-fit w-8/12 mx-auto p-2 h-5/6">
                                <div className="">
                                    <label htmlFor="username" className="">Username :</label>
                                    {
                                        editMode
                                        ?
                                            <>
                                                <input type="text"
                                                    placeholder="Your name"
                                                    ref={references.username}
                                                    {...inputs.username.attr}
                                                    className="rounded-lg border-zinc-400 border-2 w-full"/>
                                                <p className={errMsg.username ? "errmsg error-message" : "offscreen"} aria-live="assertive">
                                                    {errMsg.username}
                                                </p>
                                            </>
                                        :
                                            <p className="bg-slate-400">
                                                {inputs.username.value}
                                            </p>
                                    }
                                    <br />
                                    <label htmlFor="fistname" className="">Firstname :</label>
                                    {
                                        editMode
                                        ?
                                            <>
                                                <input type="text"
                                                    placeholder="Your name"
                                                    ref={references.firstname}
                                                    {...inputs.firstname.attr}
                                                    className="rounded-lg border-zinc-400 border-2 w-full"/>
                                                <p className={errMsg.firstname ? "errmsg error-message" : "offscreen"} aria-live="assertive">
                                                    {errMsg.firstname}
                                                </p>
                                            </>
                                        :
                                            <p className="bg-slate-400">
                                                {inputs.firstname.value}
                                            </p>
                                    }
                                    <br />
                                    <label htmlFor="lastname" className="mt-2">Lastname :</label>
                                    {
                                        editMode
                                        ?
                                            <>
                                                <input type="text"
                                                    placeholder="Your lastname"
                                                    ref={references.lastname}
                                                    {...inputs.lastname.attr}
                                                    className="rounded-lg border-zinc-400 border-2 w-full"/>
                                                <p className={errMsg.lastname ? "errmsg error-message" : "offscreen"} aria-live="assertive">
                                                    {errMsg.lastname}
                                                </p>
                                            </>
                                        :
                                            <p className="bg-slate-400">
                                                {inputs.lastname.value}
                                            </p>
                                    }
                                    <br />
                                    <p className="mt-2">Email :</p>
                                    {
                                        editMode
                                        ?
                                            <>
                                                <input type="text"
                                                    placeholder="your_email@example.com"
                                                    ref={references.email}
                                                    {...inputs.email.attr}
                                                    className="rounded-lg border-zinc-400 border-2 w-full"/>
                                                <p className={errMsg.email ? "errmsg error-message" : "offscreen"} aria-live="assertive">
                                                    {errMsg.email}
                                                </p>
                                            </>
                                        :
                                            <p className="bg-slate-400">
                                                {inputs.email.value}
                                            </p>
                                    }
                                    <br />
                                    {
                                        /** Password */
                                        editMode ?
                                            <>
                                                <p className="mt-2">Password :</p>
                                                <div className="flex">
                                                    <input type={typePassword ? 'password' : 'text' }
                                                        placeholder="New password"
                                                        ref={references.password}
                                                        value={password}
                                                        onChange={ e => setPassword( e.currentTarget.value ) }
                                                        className="border-zinc-400 border-2 w-full border-r-0 rounded-s-lg"/>
                                                    <div
                                                        onClick={ () => setTypePassword( !typePassword ) }
                                                        className="bg-white border-zinc-400 border-2 rounded-e-lg cursor-pointer">
                                                        {
                                                            typePassword ?
                                                                <EyeIcon className="size-6 mx-2 bg-white text-zinc-600"/>
                                                                :
                                                                <EyeSlashIcon className="size-6 mx-2 bg-white text-zinc-600"/>
                                                        }
                                                    </div>

                                                </div>
                                                <p className={errMsg.password ? "errmsg error-message" : "offscreen"} aria-live="assertive">
                                                    {errMsg.password}
                                                </p>
                                                <br />
                                                <p className="mt-2">Confirm Password :</p>
                                                <div className="flex">
                                                    <input
                                                        type={typeConfirmPassword ? 'password' : 'text' }
                                                        placeholder="Repeat password"
                                                        ref={references.confirmPassword}
                                                        value={confirmPassword}
                                                        onChange={ e => setConfirmPassword( e.currentTarget.value ) }
                                                        className="border-zinc-400 border-2 w-full border-r-0 rounded-s-lg"/>
                                                    <div
                                                        onClick={ () => setTypeConfirmPassword( !typeConfirmPassword ) }
                                                        className="bg-white border-zinc-400 border-2 rounded-e-lg cursor-pointer">
                                                        {
                                                            typeConfirmPassword ?
                                                                <EyeIcon className="size-6 mx-2 bg-white text-zinc-600"/>
                                                                :
                                                                <EyeSlashIcon className="size-6 mx-2 bg-white text-zinc-600"/>
                                                        }
                                                    </div>
                                                </div>
                                                <p className={errMsg.confirmPassword ? "errmsg error-message" : "offscreen"} aria-live="assertive">
                                                    {errMsg.confirmPassword}
                                                </p>
                                                <br />
                                            </>
                                        : <></>
                                    }
                                    {
                                        connectedUser.isAdmin
                                        ?
                                            <div className="flex items-start mb-5 mt-4">
                                                <div className="flex items-center h-5">
                                                    <input id="persist" type="checkbox" value=""
                                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                                        onChange={ () => {
                                                            const isAdmin = inputs.roles.value.includes( ROLES.admin );
                                                            let userRoles = [ ...inputs.roles.value ];
                                                            if( isAdmin ) {
                                                                userRoles = userRoles.filter( ( role:number ) => role !== ROLES.admin );
                                                                inputs.roles.reset( userRoles );
                                                            } else {
                                                                userRoles.push( ROLES.admin );
                                                                inputs.roles.reset( userRoles )
                                                            }
                                                        } }
                                                        checked={ inputs.roles.value.includes( ROLES.admin ) }
                                                        disabled={ !editMode }
                                                    />
                                                </div>
                                                <label htmlFor="persist" className="ms-2 text-sm font-medium text-gray-900 dark:text-black">
                                                    Admin
                                                </label>
                                            </div>
                                        :
                                        <></>
                                    }
                                </div>

                                {
                                    ( ( isMe || connectedUser.isAdmin ) && !editMode ) ?
                                        <div className="px-6 py-4 flex justify-center;" style={ {justifyContent: 'center' }}>
                                            <div onClick={() => setEditMode( true ) }
                                                className="text-center justify-items-center p-2 cursor-pointer hover:scale-110 hover:bg-slate-200">
                                                <PencilIcon className="size-6 mx-2"/>
                                                <p>Modify User</p>
                                            </div>
                                            <div className="justify-items-center p-2 cursor-pointer hover:scale-110 hover:bg-slate-200">
                                                <TrashIcon onClick={ () => {} } className="size-6 text-red-500 mx-2"></TrashIcon>
                                                <p>Delete User</p>
                                            </div>
                                        </div>
                                    :
                                    ( ( isMe || connectedUser.isAdmin ) && editMode ) ?
                                        <div className="button-action-container text-center">
                                            <button
                                                onClick={handlerCancel}
                                                className="red-btn text-white font-bold py-2 px-4 rounded m-3">
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handlerSave}
                                                className="blue-btn text-white font-bold py-2 px-4 rounded m-3">
                                                Save
                                            </button>
                                        </div>
                                    :
                                        <></>
                                }
                            </div>
                        }
                    </div>

                    {
                        /* Interactions sections */
                        ( !isMe )
                        ?
                            <>
                                <div className="grid grid-rows-4 grid-flow-col gap-4 p-4">
                                    <div className="justify-items-center cursor-pointer hover:scale-110 hover:bg-slate-400 hover:rounded-md hover:p-2">
                                        <UserPlusIcon className="size-20 text-yellow-500 mx-2"/>
                                        <p className="dark:text-white">Add {defaultUser?.username} to my network</p>
                                    </div>
                                </div>

                                <div className="grid grid-rows-4 grid-flow-col gap-4 p-4">
                                    <div className="justify-items-center cursor-pointer hover:scale-110 hover:bg-slate-400 hover:rounded-md hover:p-2">
                                        <ChatBubbleBottomCenterTextIcon className="size-20 text-yellow-500 mx-2"/>
                                        <p className="dark:text-white">Start chat with {defaultUser?.username}</p>
                                    </div>
                                </div>
                            </>
                        :
                            <></>
                    }
                    </>
                :
                <p>Loading...</p>
            }
            {
                /* ===== MODALS ===== */
                needToReconnect
                    ?
                        <ReconnectModal header={'Succeeded'} message={successMsg}/>
                    :
                        <></>
            }
        </div>
    )
};

export default UserProfile;