import React, { useContext, useEffect, useState } from "react"
import { CartContext } from "../providers/CartProvider.js"
import { LineItemContext } from "../providers/LineItemProvider.js"
// import { EventContext } from "./EventProvider.js"
// import { useHistory, useParams } from "react-router-dom"
// import "./Cart.css"
// import IconButton from '@mui/material/IconButton';
// import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/Delete';
// import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

export const CartScreen = () => {
    const history = useHistory()
    const { cart, getCart } = useContext(CartContext)
    const { createLineItem, deleteLineItem, deleteLineItemTopping, lineItemToppingObjs, getLineItemToppings } = useContext(LineItemContext)
    // const { events, getEvents } = useContext(EventContext)
    // const { CartId } = useParams()

    // const { Cart, setCart } = useState({})
    const [lineItems, setLineItems] = useState()
    const [lineItemToppings, setLineItemToppings] = useState()

    const [ cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        getCart()
        getLineItemToppings()
    }, [])
    
    useEffect(() => {
        getCart()
        getLineItemToppings()
    }, [lineItems])

    useEffect(() => {
        getCart()
        getLineItemToppings()
    }, [lineItemToppings])

    const handleRemove = (id) => {
        deleteLineItem(id)
        .then(setLineItems)
        setCartTotal()
      }
    const handleRemoveAddOn = (topID, itemID) => {
        const found = lineItemToppingObjs.find(lit => lit.line_item_id === itemID && lit.topping_id === topID)
        deleteLineItemTopping(found.id)
        .then(setLineItemToppings)
      }
    
    useEffect(() => {
        let total = 0
        cart.lineitems?.forEach(item => total += item.product.price)
        setCartTotal(total)
        getCart()
    }, [lineItems])


    return (
        <>
        <article className="Carts">
            <div className="cart__head">
            <header className="events__header">
                <h1>Dub's Doubles</h1>
                <h3>A Block Near You</h3>
            </header>
            <div className="Cart__description"><strong>Order #:</strong> {cart.id}</div>
            <div className="Cart__price"><strong>Date:</strong> {cart.created_date}</div>
            <div className="Cart__price"><strong>Customer:</strong> {`${cart.customer?.user.first_name} ${cart.customer?.user.last_name}`}</div>
            </div>
            <TableContainer component={Paper} sx={{ color: "grey"}}>
                <Table aria-label="spanning table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell align="right" size="small" sx={{ pl: 0, pr: 0 }}>Topping</TableCell>
                        <TableCell align="right" size="small" padding="none"></TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {cart.lineitems?.map(item => {
                        return <><TableRow key={item.id}>
                            <TableCell className="combo__name" sx={{ pr: 0, color: "gray"}}>{item.product.name}</TableCell>
                            <TableCell align="right" size="small" sx={{ pl: 0, pr: 0 }}></TableCell>
                            <TableCell align="right" size="small" padding="none">
                                <IconButton aria-label="delete" onClick={() => {handleRemove(item.id)}}>
                                    <DeleteIcon fontSize="small"/>
                                </IconButton>
                            </TableCell>
                            <TableCell align='right' sx={{ pl: 0}}>${item.product.price === 0 ? item.toppings.forEach(topping => {
                               item.product.price += topping.price}) : item.product.price}</TableCell>
                            </TableRow>
                            {item.toppings.length > 0 ? item.toppings.map(topping => {
                                return <TableRow>
                                    <TableCell className="combo__name"></TableCell>
                                    <TableCell align="right" size="small" padding="none">{topping.name}</TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="delete" onClick={() => {handleRemoveAddOn(topping.id, item.id)}}>
                                            <RemoveCircleOutlineIcon fontSize="small"/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align='right'>${topping.price}</TableCell>
                                    </TableRow>
                            }) : ""}</>
                    })}
                    
                    <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="right">${cart.total}</TableCell>
                    </TableRow>
                    <TableRow>
                        {/* <TableCell rowSpan={3} /> */}
                        
                        <TableCell align="right"><Button variant="contained" className="btn btn-3" onClick={() => history.push(`/payment`)}>Payment</Button></TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>     
            
        </article>
        
        

        {/* <button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
            history.push("/Carts/new")
        }}
    >Register New Cart</button> */}
</>
    )
}
//----------- Buttons for CART --------------$$$
{/* <button className="btn btn-3" onClick={() => {handleRemove(item.id)}}>Remove Item</button> */}
{/* <button className="btn btn-3" onClick={() => {handleRemoveAddOn(topping.id, item.id)}}>X</button>  */}


    // <TableContainer component={Paper}>
    //     <Table  aria-label="simple table">
    //         <TableHead>
    //             <TableRow>
    //                 <TableCell>Item</TableCell>
                
    //                 <TableCell align="right">Price</TableCell>
    //                 <TableCell align="right"></TableCell>
    //             </TableRow>
    //         </TableHead>
    //         <TableBody>
    //             {cart.lineitems?.map((item) => (
    //                 <TableRow
    //                 key={item.product.name}
    //                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //                 >
    //                 <TableCell component="th" scope="row">
    //                     {item.product.name} 
    //                 </TableCell>
                    
    //                 <TableCell align="right">${item.product.price}</TableCell>
    //                 <TableCell align="right"><button className="btn btn-3" onClick={() => {handleRemove(item.id)}}>X</button></TableCell>

    //                 </TableRow>
    //             ))}
    //         </TableBody>
    //     </Table>
    // </TableContainer>

                // <div className="Cart__description"><h5>Order #:</h5> {cart.id}</div>
                // <div className="Cart__price">Date: {cart.created_date}</div>
                // <div className="Cart__price">Customer: {cart.customer?.user.first_name}</div>
    //             {/* <div className="Cart__price">{cart.customer?.user.first_name}</div> */}
    //             {
        // cart.lineitems?.map(item => {
        //     return <section key={`combo--${item.id}`} >
        //         <div className="combo__name">{item.product.name} ${item.product.price === 0 ? item.toppings.forEach(topping => {
        //             item.product.price += topping.price}) : item.product.price} <button className="btn btn-3" onClick={() => {handleRemove(item.id)}}>Remove Item</button></div>
        //         {item.toppings.length > 0 ? item.toppings.map(topping => {
        //             return <div> - {topping.name} ${topping.price}<button className="btn btn-3" onClick={() => {handleRemoveAddOn(topping.id, item.id)}}>X</button> </div>
        //         }) : ""}
        //     </section>
        // })
    // }
    //             <div className="Cart__edit">
    //                 Total: ${cart.total}
    //             {/* <button className="btn btn-3" onClick={() => {handleAddClick(Cart.id)}}>Add to Cart</button> */}
    //             </div>
    //             <div className="Cart__edit">
    //             <button className="btn btn-3" onClick={() => history.push(`/payment`)}>Payment</button>
    //             </div>









































