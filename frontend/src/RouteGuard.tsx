import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function RouteGuard() {
    const navigate = useNavigate()
    useEffect(() => {
        const isLogin = false
        if (!isLogin) {
            navigate('/login')
        }
    }, [])

    return (
        <Outlet/>
    )
}