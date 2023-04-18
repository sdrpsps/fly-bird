import {createBrowserRouter} from "react-router-dom";
import Login from '../pages/Login'
import RouteGuard from "../RouteGuard";
import {lazy} from "react";

const Home = lazy(() => import('../pages/Home'))

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