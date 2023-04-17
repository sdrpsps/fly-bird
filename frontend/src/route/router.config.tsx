import {createBrowserRouter} from "react-router-dom";
import RouteGuard from "../RouteGuard";
import {lazy} from "react";

const Home = lazy(() => import('../pages/Home/index'))
const Login = lazy(() => import('../pages/Login/index'))

const routes = createBrowserRouter([
    {
        path: '/',
        element: <RouteGuard/>,
        children: [
            {
                path: '/home',
                element: <Home/>
            },
            {
                path: '/login',
                element: <Login/>
            }
        ]
    },

])

export default routes