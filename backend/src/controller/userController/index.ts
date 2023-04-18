import {UserLoginParams} from "./types";

export const login = async (userLoginInfo: UserLoginParams) => {
    console.log(userLoginInfo);
    // 数据库
    return new Promise((resolve) => {
            setTimeout(() => {
                const user = {token: 'fake_token'}
                resolve(user)
            }, 2000)
        }
    )
}