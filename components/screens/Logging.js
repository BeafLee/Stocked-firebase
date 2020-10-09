import * as React from 'react';
import { TextInput } from 'react-native';
import { Container, Card, CardItem, Button, Text, Input } from 'native-base';

const Logging = (props, { navigation }) => {
  const AuthContext = props.extraData;
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
    <Container>
      <Card>
        <CardItem>
          <Input
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </CardItem>
      </Card>
      <Button bordered primary onPress={() => signIn({ username, password })} >
        <Text>Sign in</Text>
      </Button>
      
    </Container>
  );
}

export default Logging;