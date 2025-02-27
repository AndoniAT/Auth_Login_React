/**
 * Author: Andoni ALONSO TORT
 */

import "../../styles/login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import { useContext, useEffect, useRef, useState } from "react";
import useInput from "../../hooks/useInput";
import useToogle from "../../hooks/useToogle";
import PasswordInputs from "../elements/PasswordInput";
import MyInput from "../elements/MyInput";

/*interface LoginInterface {
    email: HTMLInputElement,
    password: HTMLInputElement
};*/

function LoginForm( ) {
    const { setAuth } = useContext( AuthContext );
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"; // Go where the user wanted to go before to be in login page
    const usernameRef = useRef<HTMLInputElement>( null );
    const errRef = useRef<HTMLInputElement>( null );

    const [ username, resetUsername, usernameAttr ] = useInput( "username", "" );
    const [ pwd, setPwd ] = useState( "" );
    const [ errMsg, setErrMsg ] = useState( "" );
    const [ check, toogleCheck ] = useToogle( "persist", false );

    useEffect( () => {
        usernameRef?.current?.focus();
    }, [] );

    useEffect( () => {
        setErrMsg( "" );
    }, [ username, pwd ] );

    const onSubmit = ( e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();

        const user = {
            username,
            password: pwd
        };

        axios.post( "/api/auth/login", user, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        } )
            .then( res => {
                const { data } = res;
                const { accessToken } = data;
                setAuth( { user: username, accessToken } );
                setPwd( "" );
                resetUsername();

                navigate( from, { replace: true } );
            } )
            .catch( err => {
                const message = err.response.data.message ?? "Login failed";

                if( !err.response ) {
                    setErrMsg( "No server response" );
                } else {
                    setErrMsg( message );
                }

                errRef?.current?.focus();
            } );
    };

    /*const togglePersist = () => {
        setPersist( ( prev: boolean ) => !prev );
    };

    useEffect( () => {
        localStorage.setItem( 'persist', JSON.stringify( persist ) );
    }, [ persist ] );*/

    return (
        <form className={"loginContainer container-form"}
            onSubmit={onSubmit}>
            <div className="w-full text-center">
                <span className="text-2xl font-semibold whitespace-nowrap">LOGIN</span>
            </div>
            <div className="w-full text-center">
                <p ref={errRef} className={errMsg ? "errmsg error-message" : "offscreen"} aria-live="assertive">{errMsg}</p>
            </div>
            <MyInput label="Your username" reference={usernameRef} type="text"
                id="username" placeholder="Your username"
                required={true} { ...usernameAttr }/>
            <PasswordInputs password={{
                value: pwd, set: setPwd
            }}/>
            <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                    <input id="persist" type="checkbox" value=""
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        onChange={toogleCheck}
                        checked={check}/>
                </div>
                <label htmlFor="persist" className="ms-2 text-sm font-medium">
                    Trust this device
                </label>
            </div>
            <div className="flex items-start mb-5">
                <Link to='/createAccount' className="text-blue-900 hover:underline dark:text-blue-500">I don't have an account</Link>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Login
            </button>
        </form>
    );
}

export default LoginForm;