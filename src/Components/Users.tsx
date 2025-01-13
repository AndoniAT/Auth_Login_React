import { useEffect, useState } from "react";
import { UserType } from "../interfaces/User";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Users = () => {
    const [ users, setUsers ] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    useEffect( () => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const resp = await axiosPrivate.get('/api/users', {
                    signal: controller.signal
                } );

                if( isMounted ) {
                    setUsers( resp.data );
                }

            } catch( e ) {
                console.error( "Error getting users ! ", e );
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [] );

    return (
        <article>
            <h2>Users List</h2>
            { users.length > 0
            ?
                (
                    <ul>
                        { users.map( ( u:UserType, i:number ) => <li key={i}>{u?.email}</li>)}
                    </ul>
                )
            :
                <p>No users to display</p>
            }
            <br />
        </article>
    )
}

export default Users;