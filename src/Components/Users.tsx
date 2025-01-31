import { useRef, useState } from "react";
import { UserType } from "../interfaces/User";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import ApiErrorHandler from "../apiErrorHandler";
import { useGetUsers } from "../hooks/packages/AdminPageHook";

const Users = () => {
    const axiosPrivate = useAxiosPrivate();

    // States
    const [ users, setUsers ] = useGetUsers();

    const [ errMsg, setErrMsg ] = useState( "" );

    // References
    const errRef = useRef<HTMLInputElement>( null );

    // Handlers
    const deleteUserHandler = async function( this:string ) {
        const id = this;

        try {
            await axiosPrivate.delete( `/api/users/${id}` );
            const us = users.filter( ( u:UserType ) => u._id !== id );
            setUsers( us );
            setErrMsg( "" );
        } catch( e:any ) {
            const error = ApiErrorHandler.getMessageError( e );
            setErrMsg( error );
            errRef?.current?.focus();
        }
    };

    return (
        <>
            <div className="w-full text-center">
                <p ref={errRef} className={errMsg ? "errmsg error-message" : "offscreen"} aria-live="assertive">{errMsg}</p>
            </div>
            <div className="w-9/12 my-0 mx-auto relative overflow-x-auto shadow-md sm:rounded-lg bg-slate-500">
                <table
                    id="users-table"
                    className={""}>
                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                    Username
                            </th>
                            <th scope="col" className="px-6 py-3">
                                    Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                    Firstname
                            </th>
                            <th scope="col" className="px-6 py-3">
                                    Lastname
                            </th>
                            <th scope="col" className="px-6 py-3">
                                    Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { users.map( ( u:UserType ) => {
                            return ( <tr key={u._id} className="border-b">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    { u.username }
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    { u.email }
                                </th>
                                <td className="px-6 py-4">
                                    { u.firstname }
                                </td>
                                <td className="px-6 py-4">
                                    { u.lastname.toUpperCase() }
                                </td>
                                <td className="px-6 py-4 flex">
                                    <Link to={`/user/${u.username}/profile`}><PencilIcon className="size-6 mx-2 cursor-pointer hover:scale-125"/></Link>
                                    <TrashIcon onClick={ u._id ? deleteUserHandler.bind( u._id ) : () => {} } className="size-6 text-red-500 mx-2 cursor-pointer hover:scale-125"/>
                                </td>
                            </tr>
                            );
                        } )
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Users;