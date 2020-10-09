import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Importing screens for the Logging Stack
import Logging from '../screens/Logging';
import SignUp from '../screens/SignUp';

const Stack = createStackNavigator();

const LoggingStack = (props) => { 
  
  const AuthContext = props.context;

  return  (
  <Stack.Navigator>
    <Stack.Screen name='Logging'>
      {props => <Logging {...props} extraData={AuthContext} />}
    </Stack.Screen>
    <Stack.Screen name='SignUp'>
      {props => <SignUp {...props} /> }
    </Stack.Screen>
  </Stack.Navigator>
)};

export default LoggingStack;