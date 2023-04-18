import Koa from 'koa'
import routesInstaller from './routes'
import bodyParser from "koa-bodyparser";
import cors from '@koa/cors'


const app = new Koa()

const port: number = 3001

app.use(bodyParser())

app.use(cors())

routesInstaller(app)

app.listen(port, () => {
    console.log('Application is running at port', port)
})