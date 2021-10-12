import React, { useContext, useEffect, useState } from "react"
import { PaymentContext } from "../providers/PaymentProvider.js"
import { Button, Title, Card } from 'react-native-paper'
import * as SecureStore from 'expo-secure-store';


export const PaymentScreen = ({navigation}) => {
    // const history = useHistory()
    const { payments, getPayments, getPaymentById, setCartPayment} = useContext(PaymentContext)
    // const [ token, setToken ] = useState("")
    // const [ payments, setPayments ] = useState([])
    useEffect(() => {
      SecureStore.getItemAsync("dd_token")
      .then(token => {
        // setToken(token)
        getPayments(token)
        })
    }, [])
    
    // useEffect(() => {
    //   getPayments(token)
    //   .then(() => setPayments(token))
    // }, [])

    const handlePaymentClick = (id) => {
        // localStorage.setItem('token', id)
        setCartPayment(id)
        navigation.navigate("Checkout")
      }
    const handlePaymentDelete = (id) => {
        // localStorage.setItem('token', id)
        deletePayment(id)
        .then(() => getPayments(token))
        // history.push(`/checkout`)
      }

    return (
        <>
          
            {
              payments?.map(payment => {
                return <Card className="paymentCard" key={payment.id}>
                  <Card.Content>
                    <Title gutterBottom variant="h5" component="div">
                      {payment.merchant_name}
                    </Title>
                    <Title variant="h6" color="text.secondary">
                      **** **** **** {payment.account_number.slice(-4)}
                    </Title>
                    <Title variant="h6" color="text.secondary">
                      {payment.expiration_date}
                    </Title>
                  </Card.Content>
                  <Card.Actions>
                    <Button mode="contained" 
                            onPress={() => {handlePaymentClick(payment.id)}}
                    >Select This Card</Button>
                    {/* <Button variant="contained" onClick={() => {handlePaymentDelete(payment.id)}} color="error">Delete</Button> */}
                  </Card.Actions>
                </Card>
              })
            }
          
            <Button variant="contained" 
                    className="btn btn-2 btn-sep icon-create"
                    
            >Add Card</Button>
        </>
    )
}
