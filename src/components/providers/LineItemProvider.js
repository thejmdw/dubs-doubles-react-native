import React, { useState, useContext } from "react"
import * as SecureStore from 'expo-secure-store';
import { CartContext } from "./CartProvider.js"


export const LineItemContext = React.createContext()

// async function getToken(key) {
//     let result = await SecureStore.getItemAsync(key);
//     if (result) {
//         return result
//     } else {
//         alert('Not logged in');
//     }
// }  

export const LineItemProvider = (props) => {
    const [ lineItems, setLineItems ] = useState([])
    const [ lineItem, setLineItem ] = useState({})
    const [ lineItemToppingObjs, setLineItemToppingObjs ] = useState([])
    const { getCart } = useContext(CartContext)
    const [ token, setToken ] = useState("")

    

    // const token = getToken("dd_token")

    const createLineItem = (product) => {

        const handleSetToken = async () => {
            SecureStore.getItemAsync("dd_token")
            .then(token => setToken(token))
        }
        handleSetToken()

        return fetch("https://dubs-doubles.herokuapp.com/profile/cart", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(product)
         })
            // .then(setLineItem(productId))
            .then(getCart)
            .catch((error)=>{
                console.log("Api call error");
                // alert(error.message);
             });
    }
    
    const deleteLineItem = (id) => {
        const handleSetToken = async () => {
            SecureStore.getItemAsync("dd_token")
            .then(token => setToken(token))
        }
        handleSetToken()
        return fetch(`https://dubs-doubles.herokuapp.com/lineitems/${id}`, {
            method: "DELETE",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(id)
         })
            .then(getCart)
            .catch((error)=>{
                console.log("Api call error");
                // alert(error.message);
             });
    }

    const deleteLineItemTopping = (id) => {
        const handleSetToken = async () => {
            SecureStore.getItemAsync("dd_token")
            .then(token => setToken(token))
        }
        handleSetToken()
        return fetch(`https://dubs-doubles.herokuapp.com/lineitemtoppings/${id}`, {
            method: "DELETE",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(id)
         })
         
            // .then(setLineItem(productId))
            // .then(getLineItems)
    }
    
    const updateLineItem = (LineItem) => {
        const handleSetToken = async () => {
            SecureStore.getItemAsync("dd_token")
            .then(token => setToken(token))
        }
        handleSetToken()
        return fetch(`https://dubs-doubles.herokuapp.com/products/${LineItem.id}`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(LineItem)
         })
            .then(setLineItem(LineItem))
            .catch((error)=>{
                console.log("Api call error");
                // alert(error.message);
             });
            // .then()
    }
    
    const getLineItemById = (id) => {
        const handleSetToken = async () => {
            SecureStore.getItemAsync("dd_token")
            .then(token => setToken(token))
        }
        handleSetToken()
        return fetch(`https://dubs-doubles.herokuapp.com/products/${id}`, { 
            headers:{
                "Authorization": `Token ${token}`
            }
        })
            .then(response => response.json())
            .then(setLineItem)
            .catch((error)=>{
                console.log("Api call error");
                // alert(error.message);
             });
    }

    const getLineItems = () => {
        const handleSetToken = async () => {
            SecureStore.getItemAsync("dd_token")
            .then(token => setToken(token))
        }
        handleSetToken()
        return fetch("https://dubs-doubles.herokuapp.com/lineitems", { 
            headers:{
                "Authorization": `Token ${token}`
            }
        })
            .then(response => response.json())
            .then(setLineItems)
            .catch((error)=>{
                console.log("Api call error");
                // alert(error.message);
             });
    }

    const getLineItemToppings = () => {
        const handleSetToken = async () => {
            SecureStore.getItemAsync("dd_token")
            .then(token => setToken(token))
        }
        handleSetToken()
        return fetch("https://dubs-doubles.herokuapp.com/lineitemtoppings", { 
            headers:{
                "Authorization": `Token ${token}`
            }
        })
            .then(response => response.json())
            .then(setLineItemToppingObjs)
            .catch((error)=>{
                console.log("Api call error");
                // alert(error.message);
             });
    }
    
    // const getLineItemTypes = () => {
    //     return fetch("https://dubs-doubles.herokuapp.com/LineItemtypes", { 
    //         headers:{
    //             "Authorization": `Token ${getToken("dd_token")}`
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(setLineItemTypes)
    // }
 
    

    return (
        <LineItemContext.Provider value={{ lineItems, lineItem, lineItemToppingObjs, getLineItemToppings, deleteLineItem, deleteLineItemTopping, getLineItems, createLineItem, updateLineItem, getLineItemById }} >
            { props.children }
        </LineItemContext.Provider>

    )
}
