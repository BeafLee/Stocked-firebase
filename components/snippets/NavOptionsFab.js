import React, { useState } from 'react';
import { View, Fab, Button, Icon, Item } from "native-base";

const NavOptionsFab = props => {
  const [activeFab, setActiveFab] = useState(false);
  const navigation = props.navigation;

  const goTo = navTo => {
    navigation.navigate(navTo);
  }

  return (
    <Fab
      active={activeFab}
      direction= 'up'
      position= 'bottomRight'
      style={{ backgroundColor: 'blue' }}
      onPress={() => setActiveFab(!activeFab)}
    >
      <Icon type='SimpleLineIcons' name='options' />
      <Button style={{ backgroundColor: 'red' }} onPress={() => goTo('ProductCreator')} >
        <Icon type='Ionicons' name='md-add' />
      </Button>
      <Button style={{ backgroundColor: 'orange' }} onPress={() => goTo('ProductSearch')} >
        <Icon type='MaterialIcons' name='search' />
      </Button>
    </Fab>
  )
};

export default NavOptionsFab;