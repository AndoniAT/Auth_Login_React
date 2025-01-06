export interface UserType {
    _id: string,
    firstname: string,
    lastname: string,
    password?: string,
    email: string,
    roles: number[]
}