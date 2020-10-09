import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

//Importing Screens Stacks Navigations
import InventoryStack from './InventoryStack';
import AccountStack from './AccountStack';

const Drawer = createDrawerNavigator();

const DrawerScreens = (props) => {
  const AuthContext = props.context

  return(
    <Drawer.Navigator
    drawerPosition='right'
    drawerStyle={{
      backgroundColor:'white',
      }}
    >
      <Drawer.Screen name='Inventory' component={InventoryStack} 
        options={{
          title:'Inventario',
        }}
      />
      <Drawer.Screen name='Account'
        options={{
          title:'cuenta',
        }}
      >
      {props => <AccountStack {...props} extraData={AuthContext} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  )
}

export default DrawerScreens;