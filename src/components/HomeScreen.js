import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeRouter as Router } from 'react-router-native'
// import { DubsDoubles } from './src/components/DubsDoubles';
import NavBar from "./NavBar"

// export const App = () => {
//   <>
//     <Router>
//       <DubsDoubles />
//     </Router>  
//   </>
// }
// const Stack = createNativeStackNavigator()

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
export const HomeScreen = ({ navigation }) => {
  return (
    <>
      {/* <NavBar /> */}
    <View style={styles.container}>
      <Button 
        title="Burgers"
        onPress={() => navigation.navigate('Burgers')}
      />
      <Button 
        title="Fries"
        onPress={() => navigation.navigate('Fries')}
      />
      <StatusBar style="auto" />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
