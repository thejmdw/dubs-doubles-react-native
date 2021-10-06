import React, { useState, useContext } from "react"
import * as SecureStore from 'expo-secure-store';


export const CartContext = React.createContext()

async function getToken(key) {
    let result = await SecureStore.getItemAsync(key);
    return result
}  

export const CartProvider = (props) => {
    const [ carts, setCarts ] = useState([])
    const [ cart, setCart ] = useState({})
    const [ token, setToken ] = useState("")
    // const { token } = useContext(LineItemContext)
    

    const createCart = (Cart) => {
        const handleSetToken = async () => {
            SecureStore.getItemAsync("dd_token")
            .then(token => setToken(token))
        }
        handleSetToken()

        return fetch("https://dubs-doubles.herokuapp.com/products", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(Cart)
         })
            .then(setCart(Cart))
            // .then()
    }
    
    const updateCart = (cart) => {
        const handleSetToken = async () => {
            SecureStore.getItemAsync("dd_token")
            .then(token => setToken(token))
        }
        handleSetToken()

        return fetch(`https://dubs-doubles.herokuapp.com/orders/${cart.id}`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(cart)
         })
            .then(setCart(cart))
            .then(getCart)
    }
    
    const getCart = () => {
        const handleSetToken = async () => {
            SecureStore.getItemAsync("dd_token")
            .then(token => setToken(token))
        }
        handleSetToken()

        return fetch(`https://dubs-doubles.herokuapp.com/profile/cart`, { 
            headers:{
                "Authorization": `Token ${token}`
            }
        })
            .then(response => response.json())
            .then(setCart)
    }

    const getCarts = () => {
        const handleSetToken = async () => {
            SecureStore.getItemAsync("dd_token")
            .then(token => setToken(token))
        }
        handleSetToken()
        return fetch("https://dubs-doubles.herokuapp.com/products?product_type=1", { 
            headers:{
                "Authorization": `Token ${token}`
            }
        })
            .then(response => response.json())
            .then(setCarts)
    }
    
 
    

    return (
        <CartContext.Provider value={{ token, setToken, carts, cart, setCart, getCart, createCart, updateCart, getCarts }} >
            { props.children }
        </CartContext.Provider>

    )
}
