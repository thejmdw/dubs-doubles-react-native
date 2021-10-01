import React, { useState } from "react"
import { Link, useHistory } from "react-router-native"
// import "./Auth.css"
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';


export const Login = props => {
    const email = React.createRef()
    const password = React.createRef()
    const invalidDialog = React.createRef()
    const history = useHistory()
    const [ error, setError ] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: email.current.value,
                password: password.current.value
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem( "dd_token", res.token )
                    localStorage.setItem( "is_staff", res.is_staff )
                    res.is_staff === true ? history.push("/admin") : history.push("/")
                }
                else {
                    setError(true)
                    // invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main style={{ textAlign: "center" }} className="loginCard__container">
            {/* <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Email or password was not valid.</div>
                <Button variant="contained" className="button--close" onClick={e => invalidDialog.current.close()}>Close</Button>
            </dialog> */}
            {/* <section> */}
                <form className="form--login loginCard" onSubmit={handleLogin}>
                    <div className="loginTitle">
                    <h2>Dub's Doubles</h2>
                    <h3>Please sign in</h3>
                    </div>
                    <fieldset>
                    <TextField 
                        inputRef={email}
                        name="email"
                        id="outlined-helperText"
                        label="E-Mail"
                        fullWidth
                        type="email"
                        error={error}
                        helperText={error ? 'Invalid Email or Password' : ' '}
                        onChange={() => {setError(false)}}
                        
                    />
                    </fieldset>
                    <fieldset>
                    <TextField
                        inputRef={password}
                        name="password"
                        type="password"
                        id="outlined-helperText"
                        label="Password"
                        fullWidth
                        error={error}
                        helperText={error ? 'Invalid Email or Password' : ' '}
                        onChange={() => {setError(false)}}
                    />
                    </fieldset>
                        <Button variant="contained" className="btn btn-1 btn-sep icon-send" type="submit">Sign In</Button>
                    
                </form>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}
