import React, { useState } from "react"
import { View } from 'react-native'
import { Link, useHistory } from "react-router-native"
import * as SecureStore from 'expo-secure-store';
import { TextInput, Title, Text, Button } from 'react-native-paper'
// import "./Auth.css"
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        alert("🔐 Here's your value 🔐 \n" + result);
    } else {
        alert('No values stored under that key.');
    }
}  

export const Login = ({ navigation }) => {
    const email = React.createRef()
    const password = React.createRef()
    const invalidDialog = React.createRef()
    const history = useHistory()
    const [ error, setError ] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch("https://dubs-doubles.herokuapp.com/login", {
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
                    save( "dd_token", res.token )
                    save( "is_staff", res.is_staff )
                    // res.is_staff === true ? navigation.navigate('Home') : navigation.navigate('Home')
                }
                else {
                    setError(true)
                    // invalidDialog.current.showModal()
                }
            })
    }

    return (
        <View style={{ textAlign: "center" }} className="loginCard__container">
            {/* <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Email or password was not valid.</div>
                <Button variant="contained" className="button--close" onClick={e => invalidDialog.current.close()}>Close</Button>
            </dialog> */}
            {/* <section> */}
                {/* <form className="form--login loginCard" onSubmit={handleLogin}>
                    <div className="loginTitle"> */}
                    <Title>Dub's Doubles</Title>
                    <Text>Please sign in</Text>
                    {/* </div> */}
                    {/* <fieldset> */}
                    <TextInput 
                        ref={email}
                        name="email"
                        id="outlined-helperText"
                        label="E-Mail"
                        fullWidth
                        type="email"
                        mode="outlined"
                        error={error}
                        helperText={error ? 'Invalid Email or Password' : ' '}
                        onChange={() => {setError(false)}}
                        
                    />
                    {/* </fieldset>
                    <fieldset> */}
                    <TextInput
                        ref={password}
                        name="password"
                        textContentType="password"
                        id="outlined-helperText"
                        label="Password"
                        mode="outlined"
                        fullWidth
                        error={error}
                        helperText={error ? 'Invalid Email or Password' : ' '}
                        onChange={() => {setError(false)}}
                    />
                    {/* </fieldset> */}
                        <Button variant="contained" className="btn btn-1 btn-sep icon-send" onPress={handleLogin}>Sign In</Button>
                    
                {/* </form>
            <section className="link--register"> */}
                {/* <Link to="/register">Not a member yet?</Link> */}
            {/* </section> */}
        </View>
    )
}
