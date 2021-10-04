import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeRouter as Router } from 'react-router-native'
import { BurgerContext } from './providers/BurgerProvider';
import { Card, Button, Title, Paragraph } from 'react-native-paper';

export const BurgerScreen = () => {
  const { burgers, getBurgers, getBurgerById } = useContext(BurgerContext)

  useEffect(() => {
    getBurgers()
}, [])

  return (
    // <BurgerProvider>
    <ScrollView>
    {
                burgers?.map(burger => {
                    return <Card key={burger.name}>
                    <Card.Cover
                      
                      source={{ uri: burger.image_path}}
                      alt="burger photo"
                    />
                    <Card.Content>
                      <Title gutterBottom variant="h5" component="div">
                        {burger.name}
                      </Title>
                      <Paragraph component="div">
                        {burger.description}
                      </Paragraph>
                      <Paragraph variant="h6" color="text.secondary">
                        ${burger.price}
                      </Paragraph>
                    </Card.Content>
                    <Card.Actions>
                      {/* <Button size="large">{burger.price}</Button> */}
                      { burger.name === "The BYOBurger" ? <Button mode="contained"  onClick={() => {handleBurgerClick(burger.id)}}>Build Burger</Button> : <Button mode="contained" size="large" onClick={() => {handleAddClick(burger.id)}}>Add to Cart</Button>}
                    </Card.Actions>
                  </Card>
                })
            }
    </ScrollView>
    // </BurgerProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
