import React, { useContext, useEffect, useState } from "react"
import { CartContext } from "./CartProvider.js"
import { PaymentContext } from "./PaymentProvider.js"
import { LineItemContext } from "../lineitem/LineItemProvider.js"
// import { EventContext } from "./EventProvider.js"
import { useHistory, useParams } from "react-router-dom"
import "./Cart.css"
import Swal from 'sweetalert2'
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export const Checkout = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        history.push("/")
    };

    const history = useHistory()
    const { cart, getCart, updateCart} = useContext(CartContext)
    const { cartPayment, setCartPayment } = useContext(PaymentContext)
    const [lineItems, setLineItems] = useState()
    const [lineItemToppings, setLineItemToppings] = useState()
    const [ cartTotal, setCartTotal] = useState(0)
    const [ cartId, setCartId] = useState(0)

    useEffect(() => {
        getCart()
    }, [])
    
    useEffect(() => {
        getCart()
    }, [lineItems])

    useEffect(() => {
        getCart()
    }, [lineItemToppings])

    
    useEffect(() => {
        let total = 0
        cart.lineitems.forEach(item => total += item.product.price)
        setCartTotal(total)
    }, [lineItems])

    const handleUpdate = () => {
        const finalCart = {...cart}
        finalCart.payment_type = cartPayment
        setCartTotal(0)
        setCartPayment(0)
        setCartId(finalCart.id)
        updateCart(finalCart)
        .then(() => handleOpen())
      }
    
    console.log(cartPayment)

    return (
        <>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Order #{cartId} Confirmed
          </Typography>
        </Box>
      </Modal>
        <article className="Checkouts">
            <div className="cart__head">
        <header className="events__header">
                <h1>Dub's Doubles</h1>
                <h3>A Block Near You</h3>
            </header>
            <div className="Cart__description">Order #: {cart.id}</div>
            <div className="Cart__price">Date: {cart.created_date}</div>
            <div className="Cart__price">Customer: {cart.customer?.user.first_name}</div>
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="spanning table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell align="right">Topping</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {cart.lineitems?.map(item => {
                        return <><TableRow key={item.id}>
                            <TableCell className="combo__name">{item.product.name}</TableCell>
                            <TableCell align="right">{item.qty}</TableCell>
                            <TableCell align="right">
                            </TableCell>
                            <TableCell align='right'>${item.product.price === 0 ? item.toppings.forEach(topping => {
                               item.product.price += topping.price}) : item.product.price}</TableCell>
                            </TableRow>
                            {item.toppings.length > 0 ? item.toppings.map(topping => {
                                return <TableRow>
                                    <TableCell className="combo__name"></TableCell>
                                    <TableCell align="right">{topping.name}</TableCell>
                                    <TableCell align="right">
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
                        
                        <TableCell align="right"><Button variant="contained" className="btn btn-3" onClick={() => {handleUpdate(cart.id)}}>Place Order</Button></TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </article>
</>
    )
}

/* <div className="Checkout__description">Order #: {cart.id}</div>
<div className="Checkout__price">Date: {cart.created_date}</div>
<div className="Checkout__price">Customer: {cart.customer?.user.first_name}</div>
{
cart.lineitems?.map(item => {
return <section key={`combo--${item.id}`} >
<div className="combo__name">{item.product.name} ${item.product.price === 0 ? item.toppings.forEach(topping => {
    item.product.price += topping.price}) : item.product.price}</div>
{item.toppings.length > 0 ? item.toppings.map(topping => {
    return <div> - {topping.name} ${topping.price} </div>
}) : ""}
</section>
})
}
<div className="Checkout__edit">
    Total: ${cart.total}
{/* <button className="btn btn-3" onClick={() => {handleAddClick(Checkout.id)}}>Add to Checkout</button> */
// </div>
// <div className="Checkout__edit">
// <button className="btn btn-3" onClick={() => {handleUpdate(cart.id)}}>Place Order</button>
// </div> */}

