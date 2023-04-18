import Koa from "koa";
import userRouter from './user'

/**
 * 聚合所有路由
 */
export default function (ctx: Koa<Koa.DefaultState, Koa.DefaultContext>) {
    ctx.use(userRouter)
}