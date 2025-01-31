/**
 * Author: Andoni ALONSO TORT
 */

import { UserType } from "./User";

type GetUsersHookType = [
    users: UserType[] | [],
    setUsers: React.Dispatch<React.SetStateAction<UserType[] | [] >>
]

export type {
    GetUsersHookType
};