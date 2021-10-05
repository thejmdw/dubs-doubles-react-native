import React, { useState, useEffect, useContext } from 'react'
import { CartContext } from "./CartProvider.js"

export const CartTotal = (cart) => {
      
        let productTotal = 0
        let toppingTotal = 0
        let allTotal = 0
        cart.cart.lineItems?.forEach(item => productTotal += parseInt(item.product?.price))
        cart.cart.lineItems?.forEach(item => item.toppings.length > 0 ? item.toppings.forEach(topping => toppingTotal += parseInt(topping.price)) : toppingTotal += 0)
        allTotal = productTotal + toppingTotal
        
      

return allTotal
 }
