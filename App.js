import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeRouter as Router } from 'react-router-native'
// import { DubsDoubles } from './src/components/DubsDoubles';
import { HomeScreen } from './src/components/HomeScreen';
import { BurgerScreen } from "./src/components/BurgerScreen";
import { FriesScreen } from './src/components/FriesScreen';
import NavBar from "./src/components/NavBar"
import { Provider as PaperProvider } from 'react-native-paper';
import { BurgerProvider } from './src/components/providers/BurgerProvider';
// export const App = () => {
//   <>
//     <Router>
//       <DubsDoubles />
//     </Router>  
//   </>
// }
const Stack = createNativeStackNavigator()
// const Stack = createStackNavigator()

export default function App() {
  return (
    <PaperProvider>
    <BurgerProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: (props) => <NavBar {...props} />
        }}>
        <Stack.Screen name="Home" component={HomeScreen} 
                      options={{title: `Dub's Doubles`}}/>
        <Stack.Screen name="Burgers" component={BurgerScreen} />
        <Stack.Screen name="Fries" component={FriesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </BurgerProvider>
    </PaperProvider>
  );
}
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
