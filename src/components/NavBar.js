import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { View } from 'react-native'
import { Appbar, Menu, Badge } from 'react-native-paper';
import * as Expo from 'expo'
import * as SecureStore from 'expo-secure-store';
import { CartContext } from "./providers/CartProvider"



const MyComponent = ({navigation, back}) => {
  const { token, setToken, cart, getCart } = useContext(CartContext)
  

    useEffect(() => {
        getCart()
        console.log("TOKEN", token)
    }, [token])

  const _goBack = () => navigation.goBack;

  const handleBurgers = () => {
    closeMenu()
    navigation.navigate('Burgers')
  };
  const handleFries = () => {
    closeMenu()
    navigation.navigate('Fries')
  };
  
  const logout = async (key) => {
    await SecureStore.deleteItemAsync(key)
    setToken("")
    navigation.navigate("Login")
    console.log(token)
  }

  const _handleMore = () => console.log('Shown more');

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header>
      { back ? <Appbar.BackAction onPress={navigation.goBack}/> : null }
      <Appbar.Content title="Dub's Doubles" onPress={() => navigation.navigate('Home')}/>
      {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
      { cart.lineitems?.length > 0 ? <View>
          <Badge
            visible={true}
            size={20}
            style={{ position: 'absolute', top: 5, right: 5 }}
          >
            {cart.lineitems?.length}
          </Badge>
          <Appbar.Action
            icon={cart.lineitems?.length > 0 ? 'cart' : ''}
            accessibilityLabel="TagChat"
            onPress={() => navigation.navigate("Cart")}
          />
      </View> : null }

      <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="menu" color="white" onPress={openMenu} />
          }>
          <Menu.Item onPress={handleBurgers} title="Burgers" />
          <Menu.Item onPress={handleFries} title="Fries" />
          <Menu.Item onPress={() => {console.log('Option 3 was pressed')}} title="Option 3" disabled />
          <Menu.Item onPress={() => {
                                logout("dd_token")
                                
                              }} 
                      title="LogOut" />
        </Menu>
    </Appbar.Header>
  );
};

export default MyComponent;