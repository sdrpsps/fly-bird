import Koa from 'koa'
import routesInstaller from './routes'


const app = new Koa()
const port: number = 3001
routesInstaller(app)
app.listen(port, () => {
    console.log('Application is running at port', port)
})