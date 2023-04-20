import {Action} from "@reduxjs/toolkit";

export interface UserInformation {
    username: string
    age: number
    token: string
}

export interface ModifyUserAction extends Action {
    type: "modifyUser",
    payload: UserInformation
}

export interface LogoutUserAction extends Action {
    type: "logoutUser",
    payload: null
}