import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeRouter as Router } from 'react-router-native'
import { HomeScreen } from './src/components/HomeScreen';
import { BurgerScreen } from "./src/components/BurgerScreen";
import { FriesScreen } from './src/components/FriesScreen';
import NavBar from "./src/components/NavBar"
import { Provider as PaperProvider } from 'react-native-paper';
import { BurgerProvider } from './src/components/providers/BurgerProvider';
import { FriesProvider } from './src/components/providers/FriesProvider';
import { Login } from './src/components/auth/Login';

const Stack = createNativeStackNavigator()
// const Stack = createStackNavigator()

export default function App() {
  return (
    <PaperProvider>
    <BurgerProvider>
      <FriesProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          header: (props) => <NavBar {...props} />
        }}>
        <Stack.Screen name="Login" component={Login}/ >
        <Stack.Screen name="Home" component={HomeScreen} 
                      options={{title: `Dub's Doubles`}} />
        <Stack.Screen name="Burgers" component={BurgerScreen} />
        <Stack.Screen name="Fries" component={FriesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </FriesProvider>
    </BurgerProvider>
    </PaperProvider>
  );
}

