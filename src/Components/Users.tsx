import { useEffect, useState } from "react";
import axios from '../api/axios';
import { UserType } from "../interfaces/User";

const Users = () => {
    const [ users, setUsers ] = useState([]);

    useEffect( () => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const resp = await axios.get('/api/users', {
                    signal: controller.signal
                } );
                console.log(resp.data);

                if( isMounted ) {
                    setUsers( resp.data );
                }

            } catch( e ) {
                console.error( e );
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
        </article>
    )
}

export default Users;