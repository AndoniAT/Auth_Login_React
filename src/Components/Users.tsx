import { useEffect, useState } from "react";
import { UserType } from "../interfaces/User";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from 'react-router-dom';

const Users = () => {
    const [ users, setUsers ] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    
    useEffect( () => {
        const controller = new AbortController();
        let isMounted = true;

        const getUsers = async () => {
            try {
                const resp = await axiosPrivate.get('/api/users', {
                    signal: controller.signal
                } );
                const emails = resp.data.map( ( us:UserType ) => us.email );
                if( isMounted ) {
                    setUsers( emails );
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
            <h2>Users List</h2>
            { users.length > 0
            ?
                (
                    <ul>
                        { users.map( ( u:string, i:number ) => <li key={i}>{u}</li>)}
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