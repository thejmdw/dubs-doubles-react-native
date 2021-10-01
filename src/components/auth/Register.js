import React, { useState } from "react"
import { Link, useHistory } from "react-router-native"
// import "./Auth.css"
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';


export const Register = (props) => {
    const firstName = React.createRef()
    const lastName = React.createRef()
    const email = React.createRef()
    const phoneNumber = React.createRef()
    const password = React.createRef()
    const verifyPassword = React.createRef()
    const passwordDialog = React.createRef()
    const history = useHistory()
    const [ error, setError ] = useState(false)
    const [ firstNameError, setFirstNameError ] = useState(false)
    const [ lastNameError, setLastNameError ] = useState(false)
    const [ passwordError, setPasswordError ] = useState(false)
    const [ emailError, setEmailError ] = useState(false)
    const [ phoneNumberError, setPhoneNumberError ] = useState(false)
    const [ helperFirstNameText, setHelperFirstNameText ] = useState("")
    const [ helperLastNameText, setHelperLastNameText ] = useState("")
    const [ helperPasswordText, setHelperPasswordText ] = useState("")
    const [ helperEmailText, setHelperEmailText ] = useState("")
    const [ helperPhoneNumberText, setHelperPhoneNumberText ] = useState("")


    const handleRegister = (e) => {
        e.preventDefault()

        if (firstName.current.value.length === 0 ) {
            setFirstNameError(true)
            setHelperFirstNameText("Can't be blank")
        } 
        else if (lastName.current.value.length === 0 ) {
            setLastNameError(true)
            setHelperLastNameText("Can't be blank")
        }
        else if (email.current.value.length === 0 ) {
            setEmailError(true)
            setHelperEmailText("Can't be blank")
        }
        else if (phoneNumber.current.value.length === 0 ) {
            setPhoneNumberError(true)
            setHelperPhoneNumberText("Can't be blank")
        }
        else if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": email.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "phone_number": phoneNumber.current.value,
                "email": email.current.value,
                "password": password.current.value
            }

            return fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("dd_token", res.token)
                        history.push("/")
                    }
                })
        } else {
            // passwordDialog.current.showModal()
            setPasswordError(true)
            setHelperPasswordText("Passwords don't match")
        }
    }

    return (
        <main style={{ textAlign: "center" }} className="loginCard__container">

            {/* <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog> */}

            <form className="form--login loginCard" onSubmit={handleRegister}>
                <h2 className="h3 mb-3 font-weight-normal">Register</h2>
                    <fieldset>
                <TextField 
                    inputRef={firstName}
                    name="firstName"
                    id="outlined-helperText"
                    label="First Name"
                    fullWidth
                    error={firstNameError}
                    helperText={helperFirstNameText}
                    onChange={() => {setFirstNameError(false)}}
                />
                </fieldset>
                <fieldset>
                <TextField 
                    inputRef={lastName}
                    name="lastName"
                    id="outlined-helperText"
                    label="Last Name"
                    fullWidth
                    error={lastNameError}
                    helperText={helperLastNameText}
                    onChange={() => {setLastNameError(false)}}
                />
                </fieldset>
                <fieldset>
                <TextField 
                    inputRef={phoneNumber}
                    name="phoneNumber"
                    id="outlined-helperText"
                    label="Phone Number"
                    type="tel"
                    fullWidth
                    error={error}
                    helperText={helperPhoneNumberText}
                    onChange={() => {setPhoneNumberError(false)}}
                />
                </fieldset>
                <fieldset>
                <TextField 
                    inputRef={email}
                    name="email"
                    id="outlined-helperText"
                    label="E-Mail"
                    type="email"
                    fullWidth
                    error={emailError}
                    helperText={helperEmailText}
                    onChange={() => {setEmailError(false)}}
                />
                </fieldset>
                <fieldset>
                <TextField 
                    inputRef={password}
                    name="password"
                    id="outlined-helperText"
                    label="Password"
                    type="password"
                    fullWidth
                    error={passwordError}
                    helperText={helperPasswordText}
                    onChange={() => {setPasswordError(false)}}
                />
                </fieldset>
                <fieldset>
                <TextField 
                    inputRef={verifyPassword}
                    name="verifyPassword"
                    id="outlined-helperText"
                    label="Verify Password"
                    type="password"
                    fullWidth
                    error={passwordError}
                    helperText={helperPasswordText}
                    onChange={() => {setPasswordError(false)}}
                />
                </fieldset>

                <Button variant="contained" className="btn btn-1 btn-sep icon-send" type="submit">Register</Button>
            </form>
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    )
}
