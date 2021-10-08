import React, { useState } from "react"
import * as SecureStore from 'expo-secure-store';

export const PaymentContext = React.createContext()

export const PaymentProvider = (props) => {
    const [ payments, setPayments ] = useState([])
    const [ payment, setPayment ] = useState({})
    const [ cartPayment, setCartPayment ] = useState(0)
    const [ token, setToken ] = useState("")

    const createPayment = (payment) => {
        const handleSetToken = async () => {
            SecureStore.getItemAsync("dd_token")
            .then(token => setToken(token))
        }
        handleSetToken()
        return fetch("https://dubs-doubles.herokuapp.com/paymenttypes", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(payment)
         })
            .then(setPayment(payment))
            // .then()
    }
    
    const getPayments = (token) => {
        // const handleSetToken = async () => {
        //     SecureStore.getItemAsync("dd_token")
        //     .then(token => setToken(token))
        // }
        // handleSetToken()
        return fetch(`https://dubs-doubles.herokuapp.com/paymenttypes`, { 
            headers:{
                "Authorization": `Token ${token}`
            }
        })
            .then(response => response.json())
            .then(setPayments)
            
    }

    // const deletePayment = (id) => {
    //     const handleSetToken = async () => {
    //         SecureStore.getItemAsync("dd_token")
    //         .then(token => setToken(token))
    //     }
    //     handleSetToken()
    //     return fetch(`https://dubs-doubles.herokuapp.com/paymenttypes/${id}`, {
    //         method: "DELETE",
    //         headers:{
    //             "Content-Type": "application/json",
    //             "Authorization": `Token ${token}`
    //         },
    //         body: JSON.stringify(id)
    //      })
            

    // }
    
 
    

    return (
        <PaymentContext.Provider value={{ payments, payment, getPayments, createPayment, cartPayment, setCartPayment }} >
            { props.children }
        </PaymentContext.Provider>

    )
}
