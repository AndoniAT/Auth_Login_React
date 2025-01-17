import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from '../api/axios';
import AuthContext from "../context/AuthProvider";
import { useContext, useEffect, useRef, useState } from "react";
import useInput from "../hooks/useInput";
import useToogle from "../hooks/useToogle";

/*interface LoginInterface {
    email: HTMLInputElement,
    password: HTMLInputElement
};*/

function LoginForm( ) {
    const { setAuth } = useContext( AuthContext );
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'; // Go where the user wanted to go before to be in login page

    const emailRef = useRef<HTMLInputElement>( null );
    const errRef = useRef<HTMLInputElement>( null );

    const [ email, resetEmail, emailAttr ] = useInput( 'email', '' );
    const [ pwd, setPwd ] = useState( '' );
    const [ errMsg, setErrMsg ] = useState( '' );
    const [ check, toogleCheck ] = useToogle( 'persist', false );

    useEffect( () => {
            emailRef?.current?.focus();
    }, [] );

    useEffect( () => {
        setErrMsg( '' );
    }, [ email, pwd ] );

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        /*const form = e.currentTarget;
        const formElements = form.elements as typeof form.elements & LoginInterface

        const {
            email,
            password
        } = formElements;

        const user = {
            email: email.value,
            password: password.value
        };*/
        
        const user = {
            email,
            password: pwd
        };

        axios.post( '/api/auth/login', user, { 
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true 
        } )
        .then( res => {
            const { data } = res;
            const { accessToken } = data;
            setAuth( { user: email, accessToken } );
            setPwd( '' );
            resetEmail();
            navigate( from, { replace: true } );
        } )
        .catch( err => {
            const message = err.response.data.message ?? 'Login failed';

            if( !err.response ) {
                setErrMsg( 'No server response' );
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
        <form className="max-w-md mx-auto mt-14 border-2 border-slate-400 p-10 rounded-lg bg-slate-200 dark:bg-gray-900"
        onSubmit={onSubmit}>
            <div className="w-full text-center">
                <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">LOGIN</span>
            </div>
            <div className="w-full text-center">
                <p ref={errRef} className={errMsg ? "errmsg error-message" : "offscreen"} aria-live="assertive">{errMsg}</p>
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input 
                    ref={emailRef}
                    {...emailAttr}
                    type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@example.com"required
                />
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input 
                    value={pwd}
                    onChange={ e => setPwd( e.currentTarget.value ) }
                    type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required />
            </div>
            <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                <input id="persist" type="checkbox" value="" 
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" 
                        onChange={toogleCheck}
                        checked={check}/>
                </div>
                <label htmlFor="persist" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
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