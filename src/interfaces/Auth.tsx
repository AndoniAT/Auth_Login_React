import { UserType } from "./User";

export interface AuthType {
    user?: UserType,
    accessToken?: string
}

export interface AuthContextType {
    auth: AuthType;
    setAuth: ( auth: object ) => void;
    /*persist: boolean,
    setPersist: React.Dispatch<React.SetStateAction<boolean>>;*/
}

export interface AccesTokenDecodedType {
    user: {
        email:string,
        roles:number[]
    }
}