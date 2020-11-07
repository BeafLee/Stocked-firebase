import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import AccessCondition from './components/navigations/AccessCondition';
import * as firebase from 'firebase';

import { View, Text } from 'native-base';

const firebaseConfig = {
  apiKey: "AIzaSyAA-OnQ0ulAlLnzBZIJKCwN7tcEEpTolvA",
  authDomain: "stockatlocal.firebaseapp.com",
  databaseURL: "https://stockatlocal.firebaseio.com",
  projectId: "stockatlocal",
  storageBucket: "stockatlocal.appspot.com",
  messagingSenderId: "275046839873",
  appId: "1:275046839873:web:d2bd206bb73b11f0c1f8c0",
  measurementId: "G-TTMXNFTNDY"
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    if (!this.state.isReady) {
      await Font.loadAsync({
        Roboto: require('./assets/fonts/Roboto-BoldCondensed.ttf'),
        Roboto_medium: require('./assets/fonts/Roboto-Medium.ttf'),
        ...Ionicons.font,
      });
      this.setState({ isReady: true });
    }
    //console.log('llega?');
    //firebase.initializeApp(firebaseConfig); // No se porque da error >:v ---- 3.26.2 -> 3.27.4 

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      console.log('inicializardo primera vez');
    } else {
      firebase.app();
      console.log('Ya estaba inicializado');
    }
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <AccessCondition />

    );
  }
}


