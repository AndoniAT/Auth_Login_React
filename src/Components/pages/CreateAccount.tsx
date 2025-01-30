import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import axios from "../../api/axios";

function CreateAccount() {
    const navigate = useNavigate();
    const [ successMsg, setSuccessMsg ] = useState( "" );
    const [ startCountBack, setStartCountBack ] = useState( false );
    const [ countSuccess, setCountSuccess ] = useState( 5 );

    const [ errMsg, setErrMsg ] = useState( {
        gral: "",
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: ""
    } );

    // Input references
    const references = {
        success: useRef<HTMLDivElement>( null ),
        gralError: useRef<HTMLDivElement>( null ),
        username: useRef<HTMLInputElement>( null ),
        firstname: useRef<HTMLInputElement>( null ),
        lastname: useRef<HTMLInputElement>( null ),
        email: useRef<HTMLInputElement>( null ),
        password: useRef<HTMLInputElement>( null ),
        confirmPassword: useRef<HTMLInputElement>( null )
    };

    // useInput (localstorage)
    const [ username, resetUsername, usernameAttr ] = useInput( "username", "" );
    const [ firstname, resetFirstname, firstnameAttr ] = useInput( "firstname", "" );
    const [ lastname, resetLastname, lastnameAttr ] = useInput( "lastname", "" );
    const [ email, resetEmail, emailAttr ] = useInput( "email", "" );

    // useState
    const [ password, setPassword ] = useState( "" );
    const [ confirmPassword, setConfirmPassword ] = useState( "" );

    const inputs = {
        username: { value : username, reset: resetUsername, attr: usernameAttr },
        firstname: { value : firstname, reset: resetFirstname, attr: firstnameAttr },
        lastname: { value: lastname, reset: resetLastname, attr: lastnameAttr },
        email: { value: email, reset: resetEmail, attr: emailAttr }
    };

    const successFinishMsg = "User created, you will be redirected to login page in... ";

    useEffect( () => {
        references.username?.current?.focus();
    }, [] );


    useEffect( () => {

        if( startCountBack ) {
            const timeout = setTimeout( () => {
                setCountSuccess( prev => {
                    const count = prev - 1;
                    setSuccessMsg( successFinishMsg + count );
                    return count;
                } );
            }, 1000 );

            if( countSuccess <= 0 ) {
                navigate( "/login" );
            }

            return () => {
                clearTimeout( timeout );
            };
        }

    }, [ countSuccess, startCountBack ] );

    useEffect( () => {
        setErrMsg( prev => {
            const errPwd = password === confirmPassword ? "" : "Passwords don't match";
            return { ...prev, confirmPassword: errPwd };
        } );

    }, [ password, confirmPassword ] );

    useEffect( () => {
        setErrMsg( prev => {
            return { ...prev, gral: "", username:"", firstname: "", lastname: "", email: "" };
        } );
    }, [ username, firstname, lastname, email ] );

    const createUser = ( e:React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();

        const new_user = {
            username,
            firstname,
            lastname,
            email,
            password,
            confirmPassword
        };

        axios.post( "/api/users", new_user, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        } )
            .then( () => {
                setStartCountBack( true );
            } )
            .catch( err => {
                if( !err.response ) {
                    return setErrMsg( prev => {
                        return {
                            ...prev,
                            gral: "No server response"
                        };
                    } );
                }

                const { data } = err.response;
                const { message } = data;

                setErrMsg( prev => {
                    return {
                        ...prev,
                        username: message?.username?.message || prev.username,
                        firstname: message?.firstname?.message || prev.firstname,
                        lastname: message?.lastname?.message || prev.lastname,
                        email: message?.email?.message || prev.email,
                        password: message?.password?.message || prev.password,
                        confirmPassword: message?.confirmPassword?.message || prev.confirmPassword,
                    };
                } );

                if( message.username ) {
                    references.username.current?.focus();
                } else if( message.firstname ) {
                    references.firstname.current?.focus();
                } else if( message.lastname ) {
                    references.lastname.current?.focus();
                } else if( message.email ) {
                    references.email.current?.focus();
                } else if( message.password ) {
                    references.password.current?.focus();
                } else if( message.confirmPassword ) {
                    references.confirmPassword.current?.focus();
                } else {
                    setErrMsg( prev => {
                        return { ...prev, gral: message };
                    } );
                    references.gralError?.current?.focus();
                }

            } );
    };

    return (
        <form
            onSubmit={createUser}
            className="max-w-md mx-auto mt-14 border-2 border-slate-400 p-10 rounded-lg bg-slate-200 dark:bg-gray-900">
            <div className="w-full text-center mb-3">
                <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">CREATE ACCOUNT</span>
            </div>
            <div tabIndex={-1} className="w-full text-center mb-3" ref={references.gralError}>
                <p className={errMsg.gral ? "errmsg error-message" : "offscreen"} aria-live="assertive">{errMsg.gral}</p>
            </div>
            <div className="mb-5">
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your Username
                </label>
                <input
                    ref={references.username}
                    {...inputs.username.attr}
                    type="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Firstname" required />
                <p className={errMsg.username ? "errmsg error-message" : "offscreen"} aria-live="assertive">{errMsg.username}</p>
            </div>
            <div className="mb-5">
                <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your Firstname
                </label>
                <input
                    ref={references.firstname}
                    {...inputs.firstname.attr}
                    type="firstname"
                    id="firstname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Firstname" required />
                <p className={errMsg.firstname ? "errmsg error-message" : "offscreen"} aria-live="assertive">{errMsg.firstname}</p>
            </div>
            <div className="mb-5">
                <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your Lastname
                </label>
                <input
                    ref={references.lastname}
                    {...inputs.lastname.attr}
                    type="lastname"
                    id="lastname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Lastname" required />
                <p className={errMsg.lastname ? "errmsg error-message" : "offscreen"} aria-live="assertive">{errMsg.lastname}</p>
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                </label>
                <input
                    ref={references.email}
                    {...inputs.email.attr}
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="email@example.com" required />
                <p className={errMsg.email ? "errmsg error-message" : "offscreen"} aria-live="assertive">{errMsg.email}</p>
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input
                    ref={references.password}
                    value={password}
                    onChange={ e => setPassword( e.currentTarget.value ) }
                    type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                <p className={errMsg.password ? "errmsg error-message" : "offscreen"} aria-live="assertive">{errMsg.password}</p>
            </div>
            <div className="mb-5">
                <label htmlFor="repeat-assword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Repeat password
                </label>
                <input
                    ref={references.confirmPassword}
                    value={confirmPassword}
                    onChange={ e => setConfirmPassword( e.currentTarget.value ) }
                    type="password" id="repeat-password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                <p className={errMsg.confirmPassword ? "errmsg error-message" : "offscreen"} aria-live="assertive">{errMsg.confirmPassword}</p>
            </div>
            <div className="flex items-start mb-5">
                <Link to='/login' className="text-blue-900 hover:underline dark:text-blue-500">I have an account</Link>
            </div>
            {
                successMsg ?
                    <div className="w-full text-center mb-3">
                        <p className={successMsg ? "success-message" : "offscreen "} aria-live="assertive">{successMsg}</p>
                    </div>
                    :
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Create Account
                    </button>
            }

        </form>
    );
}

export default CreateAccount;