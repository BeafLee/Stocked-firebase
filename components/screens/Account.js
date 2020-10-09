import * as React from 'react';
import { AsyncStorage,  TextInput, View } from 'react-native';
import { Container, Button, Text } from 'native-base';

const Account = props => {
  const AuthContext = props.extraData;

  const { signOut } = React.useContext(AuthContext);

  return (
    <Container>
      <Text>Signed in!</Text>
      <Button bordered danger onPress={signOut} >
        <Text>Sign out</Text>
      </Button>
    </Container>
  );
}

export default Account;