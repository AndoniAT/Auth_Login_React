import { UserType } from "./User";

export interface AuthType {
    user?: UserType,
    accessToken?: string,
    refreshToken?: string
}

export interface AuthContextType {
    auth: AuthType;
    setAuth: ( auth: object ) => void;
}