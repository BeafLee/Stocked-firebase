import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon, Button } from 'native-base';

//Importing screens for the Account Stack
import Account from '../screens/Account';

const Stack = createStackNavigator();

const AccountStack = ({ navigation, extraData }) => {
  const AuthContext = extraData;

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name='Account'
        options={{
          title:'Cuenta',
          headerRight: () => (
            <Button transparent onPress={() => navigation.toggleDrawer()}>
              <Icon type='Entypo' name='menu' style={{ color: 'black', fontSize:40 }} />
            </Button>
          )
        }}
      >
        {props => <Account {...props} extraData={AuthContext} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
};

export default AccountStack;