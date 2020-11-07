import React, { useState, useReducer, createContext, useEffect, useMemo } from 'react';
import { AsyncStorage, Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Importing The Drawer and the Logging Stack
import Drawer from './Drawer';
import LoggingStack from './LoggingStack';

const AuthContext = createContext();
//console.log('CONDICIONAMIENTOSS ');

function SplashScreen() {
  return (
    <View style={{ justifyContent: 'center', alignContent: 'center' }}>
      <Text>Loading...</Text>
    </View>
  );
}

const Stack = createStackNavigator();

const AccessCondition = ({ navigation }) => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.isLoading ? (
          // We haven't finished checking for the token yet
          <Stack.Navigator>
            <Stack.Screen name="Splash" component={SplashScreen} />
          </Stack.Navigator>
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <LoggingStack context={AuthContext} />
          ) : (
            // User is signed in
            <Drawer context={AuthContext} />
          )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default AccessCondition;