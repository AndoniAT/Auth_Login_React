import { Link, useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { UserType } from "../interfaces/User";
import { ChatBubbleBottomCenterTextIcon, PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";

const UserProfile = () => {
    const { id } = useParams();
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const [ user, setUser ] = useState<UserType|null>( null ); 
    const navigate = useNavigate();

    console.log('connected user', auth.accessToken);

    useEffect( () => {
        const controller = new AbortController();
        let isMounted = true;

        const getUser = async () => {
            try {
                const { data } = await axiosPrivate.get( `/api/users/${id}`, {
                    signal: controller.signal
                } );

                if( isMounted ) {
                    setUser( data );
                }
            } catch( e:any ) {
                if( e?.code == 'ERR_CANCELED' ) {
                    console.log( 'Request aborted !', e );
                } else {
                    console.error( "Error getting users ! ", e );
                    navigate('/login' );
                }
            }
        };

        getUser();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [] );

    return (
        <div className="bg-slate-600 flex">
            {
                user ?
                    <>
                    <div className="profileUserContainer bg-slate-400 w-5/12 h-screen p-y-10 block">
                        <h3 className="text-center text-2xl pt-5 pb-5 font-bold">Profile</h3>

                        {
                            <div className="profileInfoContainter bg-slate-300 rounded-lg border-black h-fit w-8/12 mx-auto p-2 h-5/6">
                            <p className="">Firstname :</p>
                            <p className="bg-slate-400">{user?.firstname}</p>
                            <br />
                            <p className="">Lastname :</p>
                            <p className="bg-slate-400">{user?.lastname}</p>
                            <br />
                            <p className="">email :</p>
                            <p className="bg-slate-400">{user?.email}</p>
                            <br />
                            <div className="flex items-start mb-5">
                                <div className="flex items-center h-5">
                                <input id="persist" type="checkbox" value="" 
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                        onChange={() => {}}
                                        checked={true}
                                        disabled
                                        />
                                </div>
                                <label htmlFor="persist" className="ms-2 text-sm font-medium text-gray-900 dark:text-black">
                                    Admin
                                </label>
                            </div>

                            <td className="px-6 py-4 flex justify-center;" style={ {justifyContent: 'center' }}>
                                <Link to={`/user/${user?._id}/profile/edit`}
                                    className="text-center justify-items-center p-2 cursor-pointer hover:scale-110 hover:bg-slate-200">
                                    <PencilIcon className="size-6 mx-2"/>
                                    <p>Modify User</p>
                                </Link>
                                <div className="justify-items-center p-2 cursor-pointer hover:scale-110 hover:bg-slate-200">
                                    <TrashIcon onClick={ () => {} } className="size-6 text-red-500 mx-2"></TrashIcon>
                                    <p>Delete User</p>
                                </div>
                            </td>
                        </div>
                        
                        }
                    </div>

                    <div className="grid grid-rows-4 grid-flow-col gap-4 p-4">
                        <div className="justify-items-center cursor-pointer hover:scale-110 hover:bg-slate-400 hover:rounded-md hover:p-2">
                            <UserPlusIcon className="size-20 text-yellow-500 mx-2"/>
                            <p className="dark:text-white">Add {user.firstname} to my network</p>
                        </div>
                    </div>

                    <div className="grid grid-rows-4 grid-flow-col gap-4 p-4">
                        <div className="justify-items-center cursor-pointer hover:scale-110 hover:bg-slate-400 hover:rounded-md hover:p-2">
                            <ChatBubbleBottomCenterTextIcon className="size-20 text-yellow-500 mx-2"/>
                            <p className="dark:text-white">Start chat with {user.firstname}</p>
                        </div>
                    </div>
                    </>
                :
                <p>Loading...</p>
            }
        </div>
    )
};

export default UserProfile;