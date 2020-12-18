export interface Register {
    email: string,
    password: string,
    nickName: string,
    confirmPassword: string,
}

export interface Login {
    email: string,
    password: string,
}
// methods for : decode at Protect
export interface DecodeProtected {
    id: string,
    iat: string
}