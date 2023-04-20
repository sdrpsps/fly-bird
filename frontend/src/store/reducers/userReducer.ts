import {createSlice} from "@reduxjs/toolkit";
import {LogoutUserAction, ModifyUserAction, UserInformation} from "./userTypes";

const initialState: UserInformation = {
    username: 'alice',
    age: 10,
    token: ""
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        modifyUser: (state, action: ModifyUserAction) => {
            return state = action.payload
        },
        logoutUser: (state, action: LogoutUserAction) => {
            return state = action.payload
        }
    },
})

export default userSlice.reducer
export const {modifyUser: modifyUserActionCreator, logoutUser: logoutUserActionCreator} = userSlice.actions