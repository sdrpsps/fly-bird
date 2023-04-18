import React, {useEffect} from "react";

export default function Login() {
    useEffect(() => {
        fetch('http://localhost:3001/login', {
                method: 'POST',
                body: JSON.stringify({username: 'hchow', password: '123456'})
            }
        ).then(data => data.json().then(res => console.log(res))
        ).catch(error => console.log(error))
    }, [])
    return (
        <div>Hello Login</div>
    )
}