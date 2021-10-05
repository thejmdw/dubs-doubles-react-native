import React, { useContext, useState, useEffect } from "react"
import { PaymentContext } from "./PaymentProvider.js"
import { useHistory } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const PaymentForm = () => {
    const merchantName = React.createRef()
    const accountNumber = React.createRef()
    const expirationDate = React.createRef()
    const { createPayment } = useContext(PaymentContext)
    const [ merchantNameError, setMerchantNameError ] = useState(false)
    const [ accountNumberError, setAccountNumberError ] = useState(false)
    const [ expirationError, setExpirationError ] = useState(false)
    const [ merchantNameErrorText, setMerchantNameErrorText ] = useState("")
    const [ accountNumberErrorText, setAccountNumberErrorText ] = useState("")
    const [ expirationErrorText, setExpirationErrorText ] = useState("")
    
    const history = useHistory()

    const [currentPayment, setCurrentPayment] = useState({
        merchant_name: "",
        account_number: 0,
        expiration_date: ""
    })

    // useEffect(() => {
    //     // Get all existing games from API
    //     getGames()
    // }, [])

    const changePaymentState = (e) => {
        // ...
        const newPaymentState = { ...currentPayment }
        newPaymentState[e.target.name] = e.target.value
      
        setCurrentPayment(newPaymentState)
        
    }
    
    const addPayment = () => {
        const payment = {
            merchant_name: merchantName.current.value,
            account_number: accountNumber.current.value,
            expiration_date: expirationDate.current.value
            
        }
        if (payment.merchant_name.length === 0) {
            setMerchantNameError(true)
            setMerchantNameErrorText("Can't be blank")
        }
        // else if (payment.account_number.length === 0) {
        //     setAccountNumberError(true)
        //     setAccountNumberErrorText("Can't be blank")
        // }
        else if (payment.account_number.length !== 16) {
            setAccountNumberError(true)
            setAccountNumberErrorText("Enter a valid card number")
        }
        else if (payment.expiration_date.length === 0) {
            setExpirationError(true)
            setExpirationErrorText("Can't be blank")
        }
        else if (payment.expiration_date.length !== 7) {
            setExpirationError(true)
            setExpirationErrorText("Enter a valid expiration date")
        } else if ( merchantNameError !== true && accountNumberError !== true && expirationError !== true ){
        // Send POST request to your API
        createPayment(payment)
            .then(() => history.push("/payment"))
        }
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">New Payment</h2>
            <fieldset>
            <TextField fullWidth
            inputRef={merchantName}
            name="merchant_name"
          id="outlined-helperText"
          label="Merchant Name"
        //   onChange={changePaymentState}
          error={merchantNameError}
        helperText={merchantNameErrorText}
        onChange={() => {setMerchantNameError(false)}}
        />
        </fieldset>
        <fieldset>
            <TextField fullWidth
            inputRef={accountNumber}
            name="account_number"
          id="outlined-helperText"
          label="Card Number"
        //   onChange={changePaymentState}
          error={accountNumberError}
        helperText={accountNumberErrorText}
        onChange={() => {setAccountNumberError(false)}}
        />
        </fieldset>
        <fieldset>
            <TextField fullWidth
            inputRef={expirationDate}
            name="expiration_date"
          id="outlined-helperText"
          label="Expiration Date 00/0000"
        //   onChange={changePaymentState}
          error={expirationError}
        helperText={expirationErrorText}
        onChange={() => {setExpirationError(false)}}
        />
        </fieldset>

            {/* Create the rest of the input fields */}

            <Button  variant="contained"
                onClick={addPayment}
                className="btn btn-primary">Create Payment</Button>
        </form>
    )
}
