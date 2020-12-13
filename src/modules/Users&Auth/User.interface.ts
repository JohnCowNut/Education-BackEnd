
export enum UserRoles {
    admin,
    user,
    instructors
}
export interface User {
    email: string,
    password: string,
    confirmPassword: string,
    name: string
    role: UserRoles
    createAt: Date
}