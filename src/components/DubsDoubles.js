import React from "react"
import { Route, Redirect } from "react-router-native"
// import { ApplicationViews } from "./ApplicationViews"
// import { ApplicationViews2 } from "./ApplicationViews2"
// import { NavBar } from "./nav/NavBar"
// import { AppFooter } from "./footer/AppFooter"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
// import { CartProvider } from "./cart/CartProvider"
// import { LineItemProvider } from "./lineitem/LineItemProvider"
// import { NavBar3 } from "./nav/NavBar3"
// import { ThemeProvider} from "@mui/material/styles"
// import { theme } from "./theme"

export const DubsDoubles = () => (
    <>
      <Route
        render={() => {
          // if (localStorage.getItem("dd_token") && localStorage.getItem("is_staff") === 'true' ) {
          //   return (
          //     <>
          //     <ThemeProvider theme={theme}>
          //            <CartProvider>
          //            <LineItemProvider>
          //                <NavBar2 />
          //                <NavBar3 />
          //                <ApplicationViews2 />
          //                <AppFooter />
          //            </LineItemProvider>
          //            </CartProvider>
          //     </ThemeProvider>
          //     </>
          //   );
          // } else 
          // if (localStorage.getItem("dd_token")) {
          //   return (
          //     <>    
          //         {/* <ThemeProvider theme={theme}> */}
          //            {/* <CartProvider> */}
          //                {/* <NavBar /> */}
          //                <ApplicationViews />
          //                {/* <AppFooter /> */}
          //            {/* </CartProvider> */}
          //         {/* </ThemeProvider> */}
          //     </>
          //   );
          // } else {
            return <Redirect to="/login" />;
          }
        }
      // }
      />
  
      <Route path="/login" component={Login} />
      {/* <ThemeProvider theme={theme}> */}
      {/* <CartProvider> */}
      {/* <NavBar /> */}
        {/* <Login /> */}
        {/* <AppFooter /> */}
      {/* </CartProvider> */}
      {/* </ThemeProvider> */}
      {/* </Route> */}
      <Route path="/register" component={Register} />
      {/* <ThemeProvider theme={theme}> */}
      {/* <CartProvider> */}
      {/* <NavBar /> */}
        {/* <Register /> */}
        {/* <AppFooter /> */}
      {/* </CartProvider> */}
      {/* </ThemeProvider> */}
      {/* </Route> */}
    </>
  );