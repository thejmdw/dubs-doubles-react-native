import * as React from 'react';
import { Appbar, Menu } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';

async function logout(key, value) {
  await SecureStore.deleteItemAsync(key, value);
}

const MyComponent = ({navigation, back}) => {
  const _goBack = () => navigation.goBack;

  const handleBurgers = () => {
    closeMenu()
    navigation.navigate('Burgers')
  };
  const handleFries = () => {
    closeMenu()
    navigation.navigate('Fries')
  };

  const _handleMore = () => console.log('Shown more');

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header>
      { back ? <Appbar.BackAction onPress={navigation.goBack}/> : null }
      <Appbar.Content title="Dub's Doubles" onPress={() => navigation.navigate('Home')}/>
      {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
      {/* <Appbar.Action icon="dots-vertical" onPress={_handleMore} /> */}
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
                                navigation.navigate("Login")
                              }} 
                      title="LogOut" />
        </Menu>
    </Appbar.Header>
  );
};

export default MyComponent;