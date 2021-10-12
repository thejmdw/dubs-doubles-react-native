import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeRouter as Router } from 'react-router-native'
import { FriesContext } from '../providers/FriesProvider';
import { Card, Button, Title, Paragraph } from 'react-native-paper';

export const FriesScreen = () => {
  const { fries, getFries, getFryById } = useContext(FriesContext)

  useEffect(() => {
    getFries()
  }, [])

  const handleAddClick = (id) => {
    const product = {
        product_id: id
    }
    createLineItem(product)
  }

  return (
    // <fryProvider>
    <ScrollView>
    {
                fries?.map(fry => {
                    return <Card key={fry.name}>
                    <Card.Cover
                      
                      source={{ uri: fry.image_path}}
                      alt="fry photo"
                    />
                    <Card.Content>
                      <Title gutterBottom variant="h5" component="div">
                        {fry.name}
                      </Title>
                      <Paragraph variant="h6" color="text.secondary">
                        ${fry.price}
                      </Paragraph>
                    </Card.Content>
                    <Card.Actions>
                      {/* <Button size="large">{fry.price}</Button> */}
                      <Button mode="contained" onPress={() => handleAddClick(fry.id)}>Add to Cart</Button>
                    </Card.Actions>
                  </Card>
                })
            }
    </ScrollView>
    // </fryProvider>
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
