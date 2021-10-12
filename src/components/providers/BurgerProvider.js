import React, { useState } from "react"
import * as SecureStore from 'expo-secure-store';

async function getToken(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        return result
    } else {
        alert('Not logged in');
    }
}

export const BurgerContext = React.createContext()

export const BurgerProvider = (props) => {
    const [ burgers, setBurgers ] = useState([])
    const [ burger, setBurger ] = useState({})
    const [ toppings, setToppings ] = useState([])
    const [ toppingTypes, setToppingTypes ] = useState([])
    const [ token, setToken ] = useState("")

    const createBurger = (burger) => {
        const handleSetToken = async () => {
            SecureStore.getItemAsync("dd_token")
            .then(token => setToken(token))
        }
        handleSetToken()
        return fetch("https://dubs-doubles.herokuapp.com/products", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${getToken("dd_token")}`
            },
            body: JSON.stringify(burger)
         })
            .then(setBurger(burger))
            .catch((error)=>{
                console.log("Api call error");
                // alert(error.message);
             });
    }
    
    const updateBurger = (Burger) => {
        const handleSetToken = async () => {
            SecureStore.getItemAsync("dd_token")
            .then(token => setToken(token))
        }
        handleSetToken()
        return fetch(`https://dubs-doubles.herokuapp.com/products/${Burger.id}`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${getToken("dd_token")}`
            },
            body: JSON.stringify(Burger)
         })
            .then(setBurger(Burger))
            .catch((error)=>{
                console.log("Api call error");
                // alert(error.message);
             });
    }
    
    const getBurgerById = (id) => {
        const handleSetToken = async () => {
            SecureStore.getItemAsync("dd_token")
            .then(token => setToken(token))
        }
        handleSetToken()
        return fetch(`https://dubs-doubles.herokuapp.com/products/${id}`, { 
            headers:{
                "Authorization": `Token ${getToken("dd_token")}`
            }
        })
            .then(response => response.json())
            .then(setBurger)
            .catch((error)=>{
                console.log("Api call error");
                // alert(error.message);
             });
    }

    const getBurgers = () => {
        const handleSetToken = async () => {
            SecureStore.getItemAsync("dd_token")
            .then(token => setToken(token))
        }
        handleSetToken()
        return fetch("https://dubs-doubles.herokuapp.com/products?product_type=1", { 
            headers:{
                // "Authorization": `Token ${getToken("dd_token")}`
            }
        })
            .then(response => response.json())
            .then(setBurgers)
            .catch((error)=>{
                console.log("Api call error");
                // alert(error.message);
             });
    }
    
    const getToppingTypes = () => {
        const handleSetToken = async () => {
            SecureStore.getItemAsync("dd_token")
            .then(token => setToken(token))
        }
        handleSetToken()
        return fetch("https://dubs-doubles.herokuapp.com/toppingtypes", { 
            headers:{
                "Authorization": `Token ${getToken("dd_token")}`
            }
        })
            .then(response => response.json())
            .then(setToppingTypes)
            .catch((error)=>{
                console.log("Api call error");
                // alert(error.message);
             });
    }

    const getToppings = () => {
        const handleSetToken = async () => {
            SecureStore.getItemAsync("dd_token")
            .then(token => setToken(token))
        }
        handleSetToken()
        return fetch(`https://dubs-doubles.herokuapp.com/toppings`, { 
            headers:{
                "Authorization": `Token ${getToken("dd_token")}`
            }
        })
            .then(response => response.json())
            .then(setToppings)
            .catch((error)=>{
                console.log("Api call error");
                // alert(error.message);
             });
    }
    const getToppingsByType = (id) => {
        const handleSetToken = async () => {
            SecureStore.getItemAsync("dd_token")
            .then(token => setToken(token))
        }
        handleSetToken()
        return fetch(`https://dubs-doubles.herokuapp.com/toppings?topping_type=${id}`, { 
            headers:{
                "Authorization": `Token ${getToken("dd_token")}`
            }
        })
            .then(response => response.json())
            .then(setToppings)
            .catch((error)=>{
                console.log("Api call error");
                // alert(error.message);
             });
    }
    
    return (
        <BurgerContext.Provider value={{ burgers, burger, toppings, toppingTypes, getBurgers, createBurger, updateBurger, getBurgerById, getToppings, getToppingTypes, getToppingsByType }} >
            { props.children }
        </BurgerContext.Provider>

    )
}
