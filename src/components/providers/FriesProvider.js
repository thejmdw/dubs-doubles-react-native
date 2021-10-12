import React, { useState } from "react"
import * as SecureStore from 'expo-secure-store';

export const FriesContext = React.createContext()

async function getToken(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        return result
    } else {
        alert('Not logged in');
    }
}  

export const FriesProvider = (props) => {
    const [ fries, setFries ] = useState([])
    const [ fry, setFry ] = useState({})
    const [ token, setToken ] = useState("")

    const createFry = (fry) => {
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
            body: JSON.stringify(fry)
         })
            .then(setFry(fry))
            .catch((error)=>{
                console.log("Api call error");
                // alert(error.message);
             });
            // .then()
    }
    
    const updateFry = (fry) => {
        const handleSetToken = async () => {
            SecureStore.getItemAsync("dd_token")
            .then(token => setToken(token))
        }
        handleSetToken()
        return fetch(`https://dubs-doubles.herokuapp.com/products/${fry.id}`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${getToken("dd_token")}`
            },
            body: JSON.stringify(fry)
         })
            .then(setFry(fry))
            .catch((error)=>{
                console.log("Api call error");
                // alert(error.message);
             });
            // .then()
    }
    
    const getFryById = (id) => {
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
            .then(setFry)
            .catch((error)=>{
                console.log("Api call error");
                // alert(error.message);
             });
    }

    const getFries = () => {
        const handleSetToken = async () => {
            SecureStore.getItemAsync("dd_token")
            .then(token => setToken(token))
        }
        handleSetToken()
        return fetch("https://dubs-doubles.herokuapp.com/products?product_type=2", { 
            headers:{
                // "Authorization": `Token ${getToken("dd_token")}`
            }
        })
            .then(response => response.json())
            .then(setFries)
            .catch((error)=>{
                console.log("Api call error");
                // alert(error.message);
             });
    }
    
    // const getfrieTypes = () => {
    //     return fetch("https://dubs-doubles.herokuapp.com/frietypes", { 
    //         headers:{
    //             "Authorization": `Token ${getToken("dd_token")}`
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(setfrieTypes)
    // }
 
    

    return (
        <FriesContext.Provider value={{ fries, fry, getFries, createFry, updateFry, getFryById }} >
            { props.children }
        </FriesContext.Provider>

    )
}
