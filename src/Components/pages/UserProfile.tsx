import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { UserType } from "../../interfaces/User";
import { ChatBubbleBottomCenterTextIcon, PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { ROLES } from "../../AppRoute";
import { AxiosInstance } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useConnectedUser, useCreateInputs, useCreateReferences, useGetUserProfile, useHandlerError, useVerifyCritialChanges } from "../../hooks/packages/UserProfileHooks";
import { useEffect, useState } from "react";
import { Card } from "@heroui/card";
import ApiErrorHandler from "../../apiErrorHandler";
import useLogout from "../../hooks/useLogout";
import MyInput from "../elements/MyInput";
import PasswordInputs from "../elements/PasswordInput";
import MyCheckBox from "../elements/MyCheckBox";
import { FooterActions } from "../../interfaces/UserProfile";

const updateUser = ( id:string, _axiosPrivate:AxiosInstance, data:UserType ) => {
    return _axiosPrivate.put( `/api/users/${id}`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
    } );
};

// Handlers
const deleteUser = function( id:string, _axiosPrivate:AxiosInstance ) {
    return _axiosPrivate.delete( `/api/users/${id}` );
};

const UserProfile = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const logout = useLogout();

    const axiosPrivate = useAxiosPrivate();
    const connectedUser = useConnectedUser(); // JWT => Session info
    const [ defaultUser, setDefaultUser ] = useGetUserProfile();

    // == States ==
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

    // => Delete
    const handlerDelete = () => {
        if( !id ) return;

        deleteUser( id, axiosPrivate )
            .then( () => {
                if( isMe ) {
                    logout().then( () => {
                        navigate( "/login", { state: { from: { pathname : "/" } }, replace: true } );
                    } );
                } else {
                    const goBack = () => navigate( -1 );
                    goBack();
                }
            } )
            .catch( ( e:Error ) => {
                const error = ApiErrorHandler.getMessageError( e );
                setErrMsg( ( prev ) => {
                    return {
                        ...prev,
                        gral: error
                    };
                } );

                setTimeout( ()=>{
                    if ( references?.gralError?.current ) {
                        ( document.activeElement as HTMLElement )?.blur();
                        references.gralError.current.focus();
                    }
                }, 0 );
            } );
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

    // => Change admin rights
    const handleChangeRights = () => {
        const isAdmin = inputs.roles.value.includes( ROLES.admin );
        let userRoles = [ ...inputs.roles.value ];
        if( isAdmin ) {
            userRoles = userRoles.filter( ( role:number ) => role !== ROLES.admin );
            inputs.roles.reset( userRoles );
        } else {
            userRoles.push( ROLES.admin );
            inputs.roles.reset( userRoles );
        }
    };

    const showActionButtons = ( ( isMe || connectedUser.isAdmin ) && !editMode );
    const showSaveCancelButtons = ( ( isMe || connectedUser.isAdmin ) && editMode );

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
                                <div className="profileInfoContainter container-form">
                                    <div className="">
                                        <MyInput id="username" label="Username :" type="text" err={errMsg.username} ref={references.username} placeholder="Username" disabled={!editMode} {...inputs.username.attr} />
                                        <MyInput id="firstname" label="Firstname :" type="text" err={errMsg.firstname} ref={references.firstname} placeholder="Firstname" disabled={!editMode} {...inputs.firstname.attr} />
                                        <MyInput id="lastname" label="Lastname :" type="text" err={errMsg.lastname} ref={references.lastname} placeholder="Lastname" disabled={!editMode} {...inputs.lastname.attr} />
                                        <MyInput id="email" label="Email :" type="text" err={errMsg.email} ref={references.email} placeholder="youremail@example.com" disabled={!editMode} {...inputs.email.attr} />
                                        {
                                            /** Password */
                                            editMode ?
                                                <PasswordInputs
                                                    password={{
                                                        reference: references.password,
                                                        value: inputs.password.value,
                                                        set: inputs.password.reset,
                                                        errMsg: errMsg.password
                                                    }}
                                                    confirmPassword={{
                                                        reference: references.confirmPassword,
                                                        value: inputs.confirmPassword.value,
                                                        set: inputs.confirmPassword.reset,
                                                        errMsg: errMsg.confirmPassword
                                                    }}
                                                />
                                                : <></>
                                        }
                                        {
                                            connectedUser.isAdmin
                                                ?
                                                <MyCheckBox id="admin" label={"Admin"} onChange={handleChangeRights} checked={ inputs.roles.value.includes( ROLES.admin ) } disabled={ !editMode } />
                                                :
                                                <></>
                                        }
                                    </div>
                                    <FooterUpdateButtons
                                        show={{ showActionButtons, showSaveCancelButtons }}
                                        handlers={{
                                            edit: setEditMode,
                                            delete: handlerDelete,
                                            save: handlerSave,
                                            cancel: handlerCancel,
                                        }}
                                    />
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

/**
 * Show Action buttons in footer form
 * Edit - Delete / Save - Cancel
 */
function FooterUpdateButtons( { show, handlers } : FooterActions ) {
    return (
        show.showActionButtons ?
            <div className="px-6 py-4 flex justify-center;" style={{ justifyContent: "center" }}>
                <div onClick={() => handlers.edit( true )}
                    className="text-center justify-items-center p-2 cursor-pointer hover:scale-110 hover:bg-slate-200">
                    <PencilIcon className="size-6 mx-2" />
                    <p>Modify User</p>
                </div>
                <div onClick={handlers.delete}
                    className="justify-items-center p-2 cursor-pointer hover:scale-110 hover:bg-slate-200">
                    <TrashIcon className="size-6 text-red-500 mx-2"></TrashIcon>
                    <p>Delete User</p>
                </div>
            </div>
            :
            show.showSaveCancelButtons ?
                <div className="button-action-container text-center">
                    <button
                        onClick={handlers.cancel}
                        className="red-btn text-white font-bold py-2 px-4 rounded m-3">
                    Cancel
                    </button>
                    <button
                        onClick={handlers.save}
                        className="blue-btn text-white font-bold py-2 px-4 rounded m-3">
                    Save
                    </button>
                </div>
                :
                <></>
    );
}

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