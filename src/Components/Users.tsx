import { useEffect, useRef, useState } from "react";
import { UserType } from "../interfaces/User";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import ApiErrorHandler from "../apiErrorHandler";

const Users = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    // States
    const [ users, setUsers ] = useState([]);
    const [ errMsg, setErrMsg ] = useState( '' );

    // References
    const errRef = useRef<HTMLInputElement>( null );

    // Handlers
    const deleteUserHandler = async function( this:string ) {
        const id = this;
        
        try {
            await axiosPrivate.delete( `/api/users/${id}` );
            const us = users.filter( ( u:UserType ) => u._id !== id );
            setUsers( us );
            setErrMsg( '' );
        } catch( e:any ) {
            const error = ApiErrorHandler.getMessageError( e );
            setErrMsg( error );
            errRef?.current?.focus();
        }
    };

    useEffect( () => {
        const controller = new AbortController();
        let isMounted = true;

        const getUsers = async () => {
            try {
                const resp = await axiosPrivate.get('/api/users', {
                    signal: controller.signal
                } );
                const users_response = resp.data.map( ( us:UserType ) => { 
                    const { _id, username, email, firstname, lastname } = us;
                    return { _id, username, email, firstname, lastname };
                } );
                if( isMounted ) {
                    setUsers( users_response );
                }

            } catch( e:any ) {
                if( e?.code == 'ERR_CANCELED' ) {
                    console.log( 'Request aborted !', e );
                } else {
                    console.error( "Error getting users ! ", e );
                    navigate('/login', { state: { from: location }, replace: true } );
                }
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }

    }, [] );

    return (
        <article>
            <h2 className="text-center text-lg">Users List</h2>
            <div className="w-full text-center">
                <p ref={errRef} className={errMsg ? "errmsg error-message" : "offscreen"} aria-live="assertive">{errMsg}</p>
            </div>
            { users.length > 0
            ?
                (
                    <div className="w-9/12 my-0 mx-auto relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className={`
                                w-full text-sm text-left rtl:text-right text-gray-500
                                border-3 border-slate-400
                                dark:text-gray-400 dark:border-0`
                            }>
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Username
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Fistname
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
                                        return ( <tr key={u._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        { u.username }
                                                    </th>
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
                                        )
                                    } )
                                }
                            </tbody>
                        </table>
                    </div>
                )
            :
                <p>No users to display</p>
            }
            <br />
        </article>
    )
}

export default Users;