import React, { useState } from "react"


export const FriesContext = React.createContext()

export const FriesProvider = (props) => {
    const [ fries, setFries ] = useState([])
    const [ fry, setFry ] = useState({})

    const createFry = (fry) => {
        return fetch("https://dubs-doubles.herokuapp.com/products", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("dd_token")}`
            },
            body: JSON.stringify(fry)
         })
            .then(setFry(fry))
            // .then()
    }
    
    const updateFry = (fry) => {
        return fetch(`https://dubs-doubles.herokuapp.com/products/${fry.id}`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("dd_token")}`
            },
            body: JSON.stringify(fry)
         })
            .then(setFry(fry))
            // .then()
    }
    
    const getFryById = (id) => {
        return fetch(`https://dubs-doubles.herokuapp.com/products/${id}`, { 
            headers:{
                "Authorization": `Token ${localStorage.getItem("dd_token")}`
            }
        })
            .then(response => response.json())
            .then(setFry)
    }

    const getFries = () => {
        return fetch("https://dubs-doubles.herokuapp.com/products?product_type=2", { 
            headers:{
                // "Authorization": `Token ${localStorage.getItem("dd_token")}`
            }
        })
            .then(response => response.json())
            .then(setFries)
    }
    
    // const getfrieTypes = () => {
    //     return fetch("https://dubs-doubles.herokuapp.com/frietypes", { 
    //         headers:{
    //             "Authorization": `Token ${localStorage.getItem("dd_token")}`
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
