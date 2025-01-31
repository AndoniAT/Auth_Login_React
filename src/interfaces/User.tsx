/**
 * Author: Andoni ALONSO TORT
 */

export interface UserType {
    _id?: string,
    createdAt?: string,
    updatedAt?: string,
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    roles: number[]
    password?: string,
    confirmPassword?: string
}