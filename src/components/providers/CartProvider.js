import React, { useState } from "react"
import * as SecureStore from 'expo-secure-store';

export const CartContext = React.createContext()

async function getToken(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        return result
    } else {
        alert('Not logged in');
    }
}  

export const CartProvider = (props) => {
    const [ carts, setCarts ] = useState([])
    const [ cart, setCart ] = useState({})

    const createCart = (Cart) => {
        return fetch("https://dubs-doubles.herokuapp.com/products", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${getToken("dd_token")}`
            },
            body: JSON.stringify(Cart)
         })
            .then(setCart(Cart))
            // .then()
    }
    
    const updateCart = (cart) => {
        return fetch(`https://dubs-doubles.herokuapp.com/orders/${cart.id}`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${getToken("dd_token")}`
            },
            body: JSON.stringify(cart)
         })
            .then(setCart(cart))
            .then(getCart)
    }
    
    const getCart = () => {
        return fetch(`https://dubs-doubles.herokuapp.com/profile/cart`, { 
            headers:{
                "Authorization": `Token ${getToken("dd_token")}`
            }
        })
            .then(response => response.json())
            .then(setCart)
    }

    const getCarts = () => {
        return fetch("https://dubs-doubles.herokuapp.com/products?product_type=1", { 
            headers:{
                "Authorization": `Token ${getToken("dd_token")}`
            }
        })
            .then(response => response.json())
            .then(setCarts)
    }
    
 
    

    return (
        <CartContext.Provider value={{ carts, cart, setCart, getCart, createCart, updateCart, getCarts }} >
            { props.children }
        </CartContext.Provider>

    )
}
