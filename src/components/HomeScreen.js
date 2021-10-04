import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeRouter as Router } from 'react-router-native'
// import { DubsDoubles } from './src/components/DubsDoubles';
import NavBar from "./NavBar"
import { Card, Title, Button, Paragraph }from 'react-native-paper';
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
      
      <ScrollView>
      <Card>
    <Card.Content>
      <Title>Burgers</Title>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://dubs-doubles.herokuapp.com/media/products/965a93d9-a8d7-42c3-b491-03e888e1a6bf.jpg' }} />
    <Card.Actions>
    <Button mode="contained" onPress={() => navigation.navigate('Burgers')}>
      Burgers
    </Button>
    </Card.Actions>
  </Card>
      <Card>
    
    <Card.Content>
      <Title>Fries</Title>
      {/* <Paragraph>Card content</Paragraph> */}
    </Card.Content>
    <Card.Cover source={{ uri: 'https://dubs-doubles.herokuapp.com/media/products/965a93d9-a8d7-42c3-b491-03e888e1a6bf.jpg' }} />
    <Card.Actions>
      <Button 
        mode="contained"
        onPress={() => navigation.navigate('Fries')}
      >
      Fries  
      </Button>
    </Card.Actions>
  </Card>
  </ScrollView>
    {/* <View style={styles.container}>
      <Button 
        title="Burgers"
        onPress={() => navigation.navigate('Burgers')}
      />
      <Button 
        title="Fries"
        onPress={() => navigation.navigate('Fries')}
      />
      <StatusBar style="auto" />
    </View> */}
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
