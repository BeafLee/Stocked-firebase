import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon, Button } from 'native-base';

//Importing screens for the Inventory Stack
import Inventory from '../screens/Inventory';
import ProductCreator from '../screens/ProductCreator';
import ProductSearch from '../screens/ProductSearch';
import ProductUpDate from '../screens/ProductEdit';

const Stack = createStackNavigator();

const InventoryStack = ({navigation}) => {

  return(
  <Stack.Navigator
    screenOptions={{
      headerTitleAlign:'center'
    }}
  >
    <Stack.Screen name='Inventory'
      options={{
        title: 'Inventario',
        headerRight: () => (
        <Button transparent onPress={() => navigation.toggleDrawer()} >
          <Icon type='Entypo' name='menu' style={{color:'black', fontSize:40}} />
        </Button>
        ),
      }}
    >
      {props => <Inventory {...props} extraData={navigation} />}
    </Stack.Screen>
    <Stack.Screen name='ProductCreator' component={ProductCreator} />
    <Stack.Screen name='ProductSearch' component={ProductSearch} />
    <Stack.Screen name='ProductUpDate' component={ProductUpDate} />
  </Stack.Navigator>
)};

export default InventoryStack;