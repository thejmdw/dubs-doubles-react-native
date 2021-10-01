import React from "react"
import { Route } from "react-router-native"
// import { ProfileProvider } from "./auth/ProfileProvider"
// import { BurgerProvider } from "./burger/BurgerProvider"
// import { FriesProvider } from "./fries/FriesProvider"
// import { ComboProvider } from "./combo/ComboProvider"
// import { CartProvider } from "./cart/CartProvider"
// import { LineItemProvider } from "./lineitem/LineItemProvider"
// import { PaymentProvider } from "./cart/PaymentProvider"
// import { Profile } from "./auth/Profile"
// import { Menu } from "./menu/Menu"
// import { Cart } from "./cart/Cart"
// import { Checkout } from "./cart/Checkout"
// import { BurgerList } from "./burger/BurgerList"
// import { BurgerDetail } from "./burger/BurgerDetail"
// import { FriesList } from "./fries/FriesList"
// import { FriesDetail } from "./fries/FriesDetail"
// import { PaymentList } from "./cart/PaymentList"
// import { PaymentForm } from "./cart/PaymentForm"
// import { ComboList } from "./combo/ComboList"
// import { ComboDetail } from "./combo/ComboDetail"
// import { ThemeProvider} from "@mui/material/styles"
// import { theme } from "./theme"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}> 
            {/* <ThemeProvider theme={theme}>
            <ProfileProvider>
            <BurgerProvider>
            <FriesProvider>
            <ComboProvider>
            <LineItemProvider>
            <PaymentProvider>

                <Route exact path="/profile">
                    <Profile />
                </Route>
                <Route exact path="/cart">
                    <Cart />
                </Route>

                <Route exact path="/">
                    <Menu />
                </Route>
                <Route exact path="/burgers">
                    <BurgerList />
                </Route>
                <Route exact path="/burgers/detail/:burgerId(\d+)">
                    <BurgerDetail />
                </Route>


                <Route exact path="/fries">
                    <FriesList />
                </Route>
                <Route exact path="/fries/detail/:friesId(\d+)">
                    <FriesDetail />
                </Route>


                <Route exact path="/combos">
                    <ComboList />
                </Route>
                <Route exact path="/combos/detail/:comboId(\d+)">
                    <ComboDetail />
                </Route>
                
                <Route exact path="/payment">
                    <PaymentList />
                </Route>
                <Route exact path="/payment/new">
                    <PaymentForm />
                </Route>
                <Route exact path="/checkout">
                    <Checkout />
                </Route>
            
            </PaymentProvider>
            </LineItemProvider>
            </ComboProvider>
            </FriesProvider>
            </BurgerProvider>
            </ProfileProvider>
            </ThemeProvider> */}
        </main>
    </>
}
