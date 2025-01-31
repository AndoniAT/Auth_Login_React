import "../../styles/login.css";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import axios from "../../api/axios";
import PasswordInputs from "../elements/PasswordInput";
import MyInput from "../elements/MyInput";

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
        <form onSubmit={createUser} className={"loginContainer container-form"}>
            <div className="w-full text-center mb-3">
                <span className="text-2xl font-semibold whitespace-nowrap">CREATE ACCOUNT</span>
            </div>
            <div tabIndex={-1} className="w-full text-center mb-3" ref={references.gralError}>
                <p className={errMsg.gral ? "errmsg error-message" : "offscreen"} aria-live="assertive">{errMsg.gral}</p>
            </div>
            <MyInput id="username" label="Your Username" type="text" err={errMsg.username} ref={references.username} className={""} placeholder="Username" required {...inputs.username.attr} />
            <MyInput id="firstname" label="Your Firstname" type="text" err={errMsg.firstname} ref={references.firstname} className={""} placeholder="Firstname" required {...inputs.firstname.attr} />
            <MyInput id="lastname" label="Your Lastname" type="text" err={errMsg.lastname} ref={references.lastname} className={""} placeholder="Lastname" required {...inputs.lastname.attr} />
            <MyInput id="email" label="Your email" type="text" err={errMsg.email} ref={references.email} className={""} placeholder="email@example.com" required {...inputs.email.attr} />
            <PasswordInputs
                password={{ reference: references.password, value: password, errMsg: errMsg.password, set: setPassword }}
                confirmPassword={{ reference: references.confirmPassword, value: confirmPassword, errMsg: errMsg.confirmPassword, set: setConfirmPassword }}
            />
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