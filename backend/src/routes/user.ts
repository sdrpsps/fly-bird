import KoaRouter from '@koa/router'
import {login} from "../controller/userController";
import {UserLoginParams} from "../controller/userController/types";

const userRouter = new KoaRouter()

userRouter.post('/login', async (ctx) => {
    const user = await login(ctx.request.body as UserLoginParams)
    if (user) {
        ctx.body = {
            status: 200,
            message: 'OK',
            data: user
        }
    } else {
        ctx.body = {
            status: 401,
            message: 'USER_NOT_FOUND',
            data: null
        }
    }
})

userRouter.post('/logout', async (ctx) => {
    console.log(ctx.request.body)
})

export default userRouter.routes()