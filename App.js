import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeRouter as Router } from 'react-router-native'
import { HomeScreen } from './src/components/screens/HomeScreen';
import { BurgerScreen } from "./src/components/screens/BurgerScreen";
import { FriesScreen } from './src/components/screens/FriesScreen';
import { CartScreen } from './src/components/screens/CartScreen';
import { Login } from './src/components/auth/Login';
import NavBar from "./src/components/NavBar"
import { Provider as PaperProvider } from 'react-native-paper';
import { BurgerProvider } from './src/components/providers/BurgerProvider';
import { FriesProvider } from './src/components/providers/FriesProvider';
import { CartProvider } from './src/components/providers/CartProvider';
import { LineItemProvider } from './src/components/providers/LineItemProvider';
import * as SecureStore from 'expo-secure-store';

const Stack = createNativeStackNavigator()
// const Stack = createStackNavigator()

export default function App() {
  const [ token, setToken ] = useState("")

  const handleSetToken = async () => {
    SecureStore.getItemAsync("dd_token")
    .then(token => setToken(token))
  }

  useEffect(() => {
    handleSetToken()
  }, [token])


  return (
    <PaperProvider>
      <CartProvider>
        <BurgerProvider>
          <FriesProvider>
            <LineItemProvider>
              <NavigationContainer>
              <Stack.Navigator
                  initialRouteName="Login"
                  screenOptions={{
                    header: (props) => <NavBar {...props} />
                  }}>
                
                  <Stack.Screen 
                    name="Login" 
                    component={Login}/ >
                  <Stack.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{title: `Dub's Doubles`}} />
                  <Stack.Screen 
                    name="Burgers" 
                    component={BurgerScreen} />
                  <Stack.Screen 
                    name="Fries" 
                    component={FriesScreen} />
                  <Stack.Screen 
                    name="Cart" 
                    component={CartScreen} />
                
                </Stack.Navigator>
              </NavigationContainer>
            </LineItemProvider>
          </FriesProvider>
        </BurgerProvider>
      </CartProvider>
    </PaperProvider>
  );
}

