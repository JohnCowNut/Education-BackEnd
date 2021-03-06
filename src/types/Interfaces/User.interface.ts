import mongoose from 'mongoose'
export enum UserRoles {
    admin,
    user,
    instructors
}
export interface IUser extends mongoose.Document {
    _id?: string,
    email: string,
    password: string,
    nickName: string,
    confirmPassword?: string,
    role?: UserRoles,
    createAt?: Date,
    active?: boolean,
    correctPassword?(candidatePassword: string, password: string): () => Promise<boolean>,
    changedPasswordAfter?(decoded: string): () => boolean,
    [key: string]: any,
}

export interface userRequest {
    user: {
        id: string,
    }
}