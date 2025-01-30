/**
 * Author: Andoni ALONSO TORT
 */

/**
 * == INTERFACES ==
 * Needed in User Profile page
 */

import { UserType } from "./User";

type ReferencesKeysType = "success" | "gralError" | "username" | "firstname" | "lastname" | "email" | "password" | "confirmPassword";

interface FormReferencesHTMLType {
    success: React.RefObject<HTMLDivElement>;
    gralError: React.RefObject<HTMLDivElement>;
    username: React.RefObject<HTMLInputElement>;
    firstname: React.RefObject<HTMLInputElement>;
    lastname: React.RefObject<HTMLInputElement>;
    email: React.RefObject<HTMLInputElement>;
    password: React.RefObject<HTMLInputElement>;
    confirmPassword: React.RefObject<HTMLInputElement>;
}

interface FormReferencesType extends FormReferencesHTMLType {
    findFocus: ( msg: Record<string, any> ) => boolean;
}

interface InputsType {
    username: { value: string; reset: ( val?:string ) => void; attr: any };
    firstname: { value: string; reset: ( val?:string ) => void; attr: any };
    lastname: { value: string; reset: ( val?:string ) => void; attr: any };
    email: { value: string; reset: ( val?:string ) => void; attr: any };
    roles: { value: number[]; reset: ( val?:number[] ) => void; attr: any };
    password: { value: string; reset: ( value: string ) => void };
    confirmPassword: { value: string; reset: ( value: string ) => void; attr: null };
}

interface InputsValueType {
    username?: string;
    firstname?:string;
    lastname?: string;
    email?: string;
    roles?: number[];
    password?: string;
    confirmPassword?: string;
}

interface ConnectedUserType { 
    info: {
        username: string;
        email: string;
        roles: number[];
    } | undefined; 
    isAdmin: boolean | never[]; 
}

interface VerifyCriticalChangesHookType  {
    verifyCriticalChanges: ( connectedUser: ConnectedUserType, defaultUser: UserType | null, user: UserType ) => void,
    reconnect: JSX.Element | null
}

interface ErrorMessagesType {
    gral: string,
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    confirmPassword: string
}

type ErrorHandlerHookType = [
    errMsg: ErrorMessagesType,
    setErrMsg: React.Dispatch<React.SetStateAction<ErrorMessagesType>>,
    ( err:any ) => void
]

type GetUserProfileHookType = [
    defaultUser: UserType | null,
    setDefaultUser: React.Dispatch<React.SetStateAction<UserType | null >>
]

export type {
    ReferencesKeysType,
    FormReferencesType,
    InputsType,
    InputsValueType,
    ConnectedUserType,
    VerifyCriticalChangesHookType,
    ErrorMessagesType,
    ErrorHandlerHookType,
    GetUserProfileHookType
};