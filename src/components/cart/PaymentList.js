import React, { useContext, useEffect } from "react"
import { PaymentContext } from "./PaymentProvider.js"
// import { EventContext } from "./EventProvider.js"
import { useHistory } from "react-router-dom"
import "./Cart.css"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const PaymentList = () => {
    const history = useHistory()
    const { payments, getPayments, getPaymentById, setCartPayment, deletePayment } = useContext(PaymentContext)
    // const { events, getEvents } = useContext(EventContext)

    

    useEffect(() => {
        getPayments()
        // getEvents()
    }, [])

    const handlePaymentClick = (id) => {
        // localStorage.setItem('token', id)
        setCartPayment(id)
        history.push(`/checkout`)
      }
    const handlePaymentDelete = (id) => {
        // localStorage.setItem('token', id)
        deletePayment(id)
        .then(getPayments)
        // history.push(`/checkout`)
      }

    return (
        <>
          <article className="Payment">
            <header className="events__header">
                <h1>Payments</h1>
            </header>
            <Button variant="contained" 
                    className="btn btn-2 btn-sep icon-create"
                    onClick={() => { history.push("/payment/new")}}
            >Add Card</Button>
            {
              payments.map(payment => {
                  return <Card className="paymentCard" >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {payment.merchant_name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      ************{payment.account_number.slice(-4)}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {payment.expiration_date}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" 
                            onClick={() => {handlePaymentClick(payment.id)}}
                    >Select This Card</Button>
                    {/* <Button variant="contained" onClick={() => {handlePaymentDelete(payment.id)}} color="error">Delete</Button> */}
                  </CardActions>
                </Card>
              })
            }
          </article>
        </>
    )
}
