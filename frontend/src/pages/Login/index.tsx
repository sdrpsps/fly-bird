import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/types";
import {modifyUserActionCreator} from "../../store/reducers/userReducer";

export default function Login() {
    useEffect(() => {
        fetch('http://localhost:3001/login', {
                method: 'POST',
                body: JSON.stringify({username: 'hchow', password: '123456'})
            }
        ).then(data => data.json().then(res => console.log(res))
        ).catch(error => console.log(error))
    }, [])

    const user = useSelector((state: RootState) => {
        return state.user
    })

    const dispatch = useDispatch()

    const updateUserInformation = useCallback(() => {
        dispatch(modifyUserActionCreator({
            username: 'tom',
            age: 20,
            token: 'fake_token'
        }))
    }, [dispatch])
    return (
        <>
            <div>Hello Login</div>
            <div>{JSON.stringify(user)}</div>
            <button onClick={updateUserInformation}>click me</button>
        </>

    )
}