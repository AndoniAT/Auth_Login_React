import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { UserType } from "../../interfaces/User";
import { ChatBubbleBottomCenterTextIcon, EyeIcon, EyeSlashIcon, PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { ROLES } from "../../AppRoute";
import { AxiosInstance } from "axios";
import { useParams } from "react-router-dom";
import { useConnectedUser, useCreateInputs, useCreateReferences, useGetUserProfile, useHandlerError, useVerifyCritialChanges } from "../../hooks/packages/UserProfileHooks";
import { useEffect, useState } from "react";
import { Card } from "@heroui/card";

const updateUser = async ( id:string, _axiosPrivate:AxiosInstance, data:UserType ) => {
    return _axiosPrivate.put( `/api/users/${id}`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
    } );
};

const UserProfile = () => {

    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const connectedUser = useConnectedUser(); // JWT => Session info
    const [ defaultUser, setDefaultUser ] = useGetUserProfile();

    // == States ==
    const [ typePassword, setTypePassword ] = useState( true );
    const [ typeConfirmPassword, setTypeConfirmPassword ] = useState( true );
    const [ isMe, setIsMe ] = useState( false );
    const [ editMode, setEditMode ] = useState( false );

    // == Other hooks ==
    const [ inputs, inputsReset, inputsUserObject ] = useCreateInputs();
    const references = useCreateReferences();
    const [ errMsg, setErrMsg, handlerError ] = useHandlerError( references );
    const { verifyCriticalChanges, reconnect } = useVerifyCritialChanges();

    // == USE EFFECT ==
    useEffect( () => {
        // Clean errors
        setErrMsg( prev => {
            return { ...prev, gral: "", username: "", firstname: "", lastname: "", email: "", password: "", confirmPassword: "" };
        } );
    }, [ inputs.username.value, inputs.firstname.value, inputs.lastname.value, inputs.email.value, setErrMsg ] );

    // Set is me
    useEffect( () => {
        if( defaultUser ) {
            inputsReset( { ...defaultUser } );
            if( defaultUser.username === connectedUser.info?.username ) {
                setIsMe( true );
            }
        }
    }, [ defaultUser ] );

    // == HANDLERS ==
    // => Save
    const handlerSave = () => {
        if( !id ) return;

        const user = inputsUserObject();
        updateUser( id, axiosPrivate, user )
            .then( async () => {
                if( user.password ) delete user?.password;
                verifyCriticalChanges( connectedUser, defaultUser, user );
                setDefaultUser( user );
                inputsReset( user );

                if( inputs.email.value === connectedUser?.info?.email ) {
                    setIsMe( true );
                }

                setEditMode( !editMode );

            } )
            .catch( handlerError );

    };

    // => Cancel
    const handlerCancel = () => {
        if( defaultUser ) {
            setErrMsg( prev => {
                return { ...prev, gral: "", username: "", firstname: "", lastname: "", email: "", password: "", confirmPassword: "" };
            } );
            inputsReset( defaultUser );
            setEditMode( !editMode );
        }
    };

    return (
        <div className="block lg:flex">
            {
                /* Profile form / information section */
                <>
                    <div className="profileUserContainer">
                        <Card className="w-7/12 space-y-5 p-1 h-fit bg-slate-400" radius="lg">
                            {
                                errMsg?.gral ?
                                    <div tabIndex={-1} className="w-full text-center mb-3" ref={references.gralError}>
                                        <p className={errMsg ? "errmsg error-message" : "offscreen"} aria-live="assertive">{errMsg.gral}</p>
                                    </div>
                                    : <></>
                            }

                            {
                                /* == FORM == */
                                <div className="profileInfoContainter">
                                    <div className="">
                                        <label htmlFor="username" className="">Username :</label>
                                        {
                                            <>
                                                <input type="text"
                                                    placeholder="Your username"
                                                    ref={references.username}
                                                    {...inputs.username.attr}
                                                    disabled={!editMode}/>
                                                <p className={errMsg.username ? "errmsg error-message" : "offscreen"} aria-live="assertive">
                                                    {errMsg.username}
                                                </p>
                                            </>
                                        }
                                        <br />
                                        <label htmlFor="fistname" className="">Firstname :</label>
                                        {
                                            <>
                                                <input type="text"
                                                    placeholder="Your firstname"
                                                    ref={references.firstname}
                                                    {...inputs.firstname.attr}
                                                    disabled={!editMode}
                                                />
                                                <p className={errMsg.firstname ? "errmsg error-message" : "offscreen"} aria-live="assertive">
                                                    {errMsg.firstname}
                                                </p>
                                            </>
                                        }
                                        <br />
                                        <label htmlFor="lastname" className="mt-2">Lastname :</label>
                                        {
                                            <>
                                                <input type="text"
                                                    placeholder="Your lastname"
                                                    ref={references.lastname}
                                                    {...inputs.lastname.attr}
                                                    disabled={!editMode}/>
                                                <p className={errMsg.lastname ? "errmsg error-message" : "offscreen"} aria-live="assertive">
                                                    {errMsg.lastname}
                                                </p>
                                            </>
                                        }
                                        <br />
                                        <label htmlFor="email" className="mt-2">Email :</label>
                                        {
                                            <>
                                                <input type="text"
                                                    placeholder="your_email@example.com"
                                                    ref={references.email}
                                                    {...inputs.email.attr}
                                                    disabled={!editMode}/>
                                                <p className={errMsg.email ? "errmsg error-message" : "offscreen"} aria-live="assertive">
                                                    {errMsg.email}
                                                </p>
                                            </>
                                        }
                                        <br />
                                        {
                                            /** Password */
                                            editMode ?
                                                <>
                                                    <p className="mt-2">Password :</p>
                                                    <div className="flex">
                                                        <input type={typePassword ? "password" : "text" }
                                                            placeholder="New password"
                                                            ref={references.password}
                                                            value={inputs.password.value}
                                                            onChange={ e => inputs.password.reset( e.currentTarget.value ) }
                                                            className="password"/>
                                                        <div
                                                            onClick={ () => setTypePassword( !typePassword ) }
                                                            className="password-eye-container">
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
                                                            type={typeConfirmPassword ? "password" : "text" }
                                                            placeholder="Repeat password"
                                                            ref={references.confirmPassword}
                                                            value={inputs.confirmPassword.value}
                                                            onChange={ e => inputs.confirmPassword.reset( e.currentTarget.value ) }
                                                            className="password"/>
                                                        <div
                                                            onClick={ () => setTypeConfirmPassword( !typeConfirmPassword ) }
                                                            className="password-eye-container">
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
                                                            className={""}
                                                            onChange={ () => {
                                                                const isAdmin = inputs.roles.value.includes( ROLES.admin );
                                                                let userRoles = [ ...inputs.roles.value ];
                                                                if( isAdmin ) {
                                                                    userRoles = userRoles.filter( ( role:number ) => role !== ROLES.admin );
                                                                    inputs.roles.reset( userRoles );
                                                                } else {
                                                                    userRoles.push( ROLES.admin );
                                                                    inputs.roles.reset( userRoles );
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
                                            <div className="px-6 py-4 flex justify-center;" style={ {justifyContent: "center" }}>
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
                        </Card>
                    </div>

                    {
                        /* Interactions sections */
                        ( !isMe && defaultUser )
                            ?
                            <Interactions username={defaultUser.username}/>
                            :
                            <></>
                    }
                </>
            }
            {
                /* ===== MODALS ===== */
                reconnect
            }
        </div>
    );
};

export default UserProfile;

function Interactions( { username }:Readonly<{ username:string }> ) {
    return (
        <div className="flex lg:w-7/12">
            <div className="p-4 h-fit">
                <div className="justify-items-center cursor-pointer hover:scale-110 hover:bg-slate-400 hover:rounded-md hover:p-2">
                    <UserPlusIcon className="size-20 text-yellow-500 mx-2"/>
                    <p className="dark:text-white">Add {username} to my network</p>
                </div>
            </div>
            {
                <div className="p-4 h-fit">
                    <div className="justify-items-center cursor-pointer hover:scale-110 hover:bg-slate-400 hover:rounded-md hover:p-2">
                        <ChatBubbleBottomCenterTextIcon className="size-20 text-yellow-500 mx-2"/>
                        <p className="dark:text-white">Start chat with {username}</p>
                    </div>
                </div>
            }
        </div>
    );
}