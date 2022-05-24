/**
 * Taken from the Assignment 1 refence source code.
 * Credit https://learn.canterbury.ac.nz/mod/resource/view.php?id=2207723
 */
type userRegister = {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}
type Token = {
    token: string,
    userId:string
}

type userLogin = {
    email: string,
    password: string
}

type user = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    imageFilename: string,
    authToken: string
}

type userReturnWithEmail = {
    firstName: string,
    lastName: string,
    email:string
}

type userReturn = {
    firstName: string,
    lastName: string
}

type userPatch = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    currentPassword: string
}
