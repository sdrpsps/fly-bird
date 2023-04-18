import KoaRouter from '@koa/router'

const userRouter = new KoaRouter()

userRouter.post('/login', async(ctx) => {
    console.log(ctx.request)
})

userRouter.post('/logout', (ctx) => {
    console.log(ctx.request)
})

export default userRouter.routes()