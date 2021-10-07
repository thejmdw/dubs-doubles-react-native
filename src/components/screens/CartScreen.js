import React, { useContext, useEffect, useState } from "react"
import { CartContext } from "../providers/CartProvider.js"
import { LineItemContext } from "../providers/LineItemProvider.js"
import { DataTable, Button } from "react-native-paper"
import { ScrollView } from "react-native"
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
    // const history = useHistory()
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
        .then(() => {getCart()})
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
        <ScrollView>
            <DataTable>
                <DataTable.Header>      
                    <DataTable.Title>Item</DataTable.Title>
                    <DataTable.Title numeric>Topping</DataTable.Title>
                    {/* <DataTable.Title></DataTable.Title> */}
                    <DataTable.Title numeric>Price</DataTable.Title>            
                </DataTable.Header>

            {cart.lineitems?.map(item => {
                return <><DataTable.Row>
                            <DataTable.Cell >{item.product.name}</DataTable.Cell>
                            {/* <DataTable.Cell ></DataTable.Cell> */}
                            <DataTable.Cell numeric>
                                <Button icon="trash-can" onPress={() => handleRemove(item.id)}/>
                                {/* <IconButton aria-label="delete" onClick={() => {handleRemove(item.id)}}>
                                    <DeleteIcon fontSize="small"/>
                                </IconButton> */}
                            </DataTable.Cell>
                            <DataTable.Cell numeric>${item.product.price === 0 ? item.toppings.forEach(topping => {
                                item.product.price += topping.price}) : item.product.price}</DataTable.Cell>
                            </DataTable.Row>
                            {item.toppings.length > 0 ? item.toppings.map(topping => {
                                return <DataTable.Row>
                                    {/* <DataTable.Cell ></DataTable.Cell> */}
                                    <DataTable.Cell >{topping.name}</DataTable.Cell>
                                    <DataTable.Cell >
                                        <Button icon="close-circle"/>
                                    </DataTable.Cell>
                                    <DataTable.Cell numeric>${topping.price}</DataTable.Cell>
                            </DataTable.Row>
                    }) : null }</>
            })}

                    <DataTable.Row>
                        
                        <DataTable.Cell >Total</DataTable.Cell>
                        <DataTable.Cell numeric>${cart.total}</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        
                        
                        <DataTable.Cell numeric><Button mode="contained">Payment</Button></DataTable.Cell>
                    </DataTable.Row>
                
            </DataTable>
        </ScrollView>
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







            // <DataTable>
                
            //         <DataTable.Header>
                    
            //             <DataTable.Title>Item</DataTable.Title>
            //             <DataTable.Title align="right" size="small" sx={{ pl: 0, pr: 0 }}>Topping</DataTable.Title>
            //             <DataTable.Title align="right" size="small" padding="none"></DataTable.Title>
            //             <DataTable.Title align="right">Price</DataTable.Title>
                    
            //         </DataTable.Header>
                    
                    // {cart.lineitems?.map(item => {
                    //     return <><DataTable.Row key={item.id}>
                    //         <DataTable.Cell className="combo__name" sx={{ pr: 0, color: "gray"}}>{item.product.name}</DataTable.Cell>
                    //         <DataTable.Cell align="right" size="small" sx={{ pl: 0, pr: 0 }}></DataTable.Cell>
                    //         <DataTable.Cell align="right" size="small" padding="none">
                    //             {/* <IconButton aria-label="delete" onClick={() => {handleRemove(item.id)}}>
                    //                 <DeleteIcon fontSize="small"/>
                    //             </IconButton> */}
                    //         </DataTable.Cell>
                    //         <DataTable.Cell align='right' sx={{ pl: 0}}>${item.product.price === 0 ? item.toppings.forEach(topping => {
                    //            item.product.price += topping.price}) : item.product.price}</DataTable.Cell>
                    //         </DataTable.Row>
                    //         {item.toppings.length > 0 ? item.toppings.map(topping => {
                    //             return <DataTable.Row>
                    //                 <DataTable.Cell className="combo__name"></DataTable.Cell>
                    //                 <DataTable.Cell align="right" size="small" padding="none">{topping.name}</DataTable.Cell>
                    //                 <DataTable.Cell align="right">
                    //                     {/* <IconButton aria-label="delete" onClick={() => {handleRemoveAddOn(topping.id, item.id)}}>
                    //                         <RemoveCircleOutlineIcon fontSize="small"/>
                    //                     </IconButton> */}
                    //                 </DataTable.Cell>
                    //                 <DataTable.Cell align='right'>${topping.price}</DataTable.Cell>
                    //                 </DataTable.Row>
                    //         }) : ""}</>
                    // })}
                    
                    // <DataTable.Row>
                    //     <DataTable.Cell rowSpan={3} />
                    //     <DataTable.Cell colSpan={2}>Total</DataTable.Cell>
                    //     <DataTable.Cell align="right">${cart.total}</DataTable.Cell>
                    // </DataTable.Row>
                    // <DataTable.Row>
                        
                        
                    //     <DataTable.Cell align="right"><Button variant="contained" className="btn btn-3" >Payment</Button></DataTable.Cell>
                    // </DataTable.Row>
              
            // </DataTable>     


































