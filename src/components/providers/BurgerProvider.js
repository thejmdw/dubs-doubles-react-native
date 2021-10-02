import React, { useState } from "react"


export const BurgerContext = React.createContext()

export const BurgerProvider = (props) => {
    const [ burgers, setBurgers ] = useState([])
    const [ burger, setBurger ] = useState({})
    const [ toppings, setToppings ] = useState([])
    const [ toppingTypes, setToppingTypes ] = useState([])

    const createBurger = (burger) => {
        return fetch("https://dubs-doubles.herokuapp.com/products", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("dd_token")}`
            },
            body: JSON.stringify(burger)
         })
            .then(setBurger(burger))
            // .then()
    }
    
    const updateBurger = (Burger) => {
        return fetch(`https://dubs-doubles.herokuapp.com/products/${Burger.id}`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("dd_token")}`
            },
            body: JSON.stringify(Burger)
         })
            .then(setBurger(Burger))
            // .then()
    }
    
    const getBurgerById = (id) => {
        return fetch(`https://dubs-doubles.herokuapp.com/products/${id}`, { 
            headers:{
                "Authorization": `Token ${localStorage.getItem("dd_token")}`
            }
        })
            .then(response => response.json())
            .then(setBurger)
    }

    const getBurgers = () => {
        return fetch("https://dubs-doubles.herokuapp.com/products?product_type=1", { 
            headers:{
                // "Authorization": `Token ${localStorage.getItem("dd_token")}`
            }
        })
            .then(response => response.json())
            .then(setBurgers)
    }
    
    const getToppingTypes = () => {
        return fetch("https://dubs-doubles.herokuapp.com/toppingtypes", { 
            headers:{
                "Authorization": `Token ${localStorage.getItem("dd_token")}`
            }
        })
            .then(response => response.json())
            .then(setToppingTypes)
    }

    const getToppings = () => {
        return fetch(`https://dubs-doubles.herokuapp.com/toppings`, { 
            headers:{
                "Authorization": `Token ${localStorage.getItem("dd_token")}`
            }
        })
            .then(response => response.json())
            .then(setToppings)
    }
    const getToppingsByType = (id) => {
        return fetch(`https://dubs-doubles.herokuapp.com/toppings?topping_type=${id}`, { 
            headers:{
                "Authorization": `Token ${localStorage.getItem("dd_token")}`
            }
        })
            .then(response => response.json())
            .then(setToppings)
    }
    
    return (
        <BurgerContext.Provider value={{ burgers, burger, toppings, toppingTypes, getBurgers, createBurger, updateBurger, getBurgerById, getToppings, getToppingTypes, getToppingsByType }} >
            { props.children }
        </BurgerContext.Provider>

    )
}
