/**
 * Author: Andoni ALONSO TORT
 */

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { RefObject, useEffect, useState } from "react";

interface PasswordType extends React.ButtonHTMLAttributes<HTMLInputElement> {
    reference?:RefObject<HTMLInputElement>,
    value:string
    set:( pwd:string )=>void
    errMsg?: string,
}

interface PasswordInputs {
    password:PasswordType,
    confirmPassword?:PasswordType
}

interface PasswordInputType extends PasswordType {
    label:string
    id:string,
    err?:string
}

const PasswordInputs = ( {
    password, confirmPassword
} : PasswordInputs ) => {
    const [ err, setErr ] = useState( "" );

    useEffect( () => {
        if( password.reference && confirmPassword?.reference ) {
            if( password.value == confirmPassword?.value ) {
                setErr( "" );
            } else {
                setErr( "Passwords don't match" );
            }

        }

    }, [ password, confirmPassword ] );

    return (
        <>
            <PasswordInput password={{
                ...password, label: "Your password", id:"password"
            }} />
            {
                confirmPassword ?
                    <PasswordInput password={{
                        ...confirmPassword, label: "Confirm password", id:"confirmPassword", err
                    }}/>
                    :
                    <></>
            }
        </>
    );
};

const PasswordInput = ( { password } : { password: PasswordInputType } ) => {
    const [ typePassword, setTypePassword ] = useState( true );

    return (
        <>
            {
                password ?
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium">
                            {password.label}
                        </label>
                        <div className="flex">
                            <input
                                type={typePassword ? "password" : "text" }
                                ref={password.reference}
                                value={password.value}
                                onChange={ e => password.set( e.currentTarget.value ) }
                                id="password"
                                className="password" required
                            />
                            <div
                                onClick={ () => setTypePassword( !typePassword ) }
                                className="password-eye-container">
                                {
                                    typePassword ?
                                        <EyeIcon className="size-6 mx-2 bg-white text-zinc-600"/>
                                        :
                                        <EyeSlashIcon className="size-6 mx-2 bg-white text-zinc-600"/>
                                }
                            </div>

                        </div>
                        <p className={ ( password?.err || password?.errMsg ) ? "errmsg error-message" : "offscreen"} aria-live="assertive">{ password.err ?? password.errMsg}</p>
                    </div>
                    :
                    <></>
            }
        </>
    );
};

export default PasswordInputs;