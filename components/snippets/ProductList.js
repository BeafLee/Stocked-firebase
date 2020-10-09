import React, { useState, useCallback, useEffect } from "react";
import { FlatList, StyleSheet, Modal, RefreshControl } from "react-native";
import { Text, Button, Icon, View, ListItem, Body, Left, Right, List } from 'native-base';

import EditScreen from '../screens/ProductEdit';

export const ProductList = props => {

  const dataArray = props.data;

  const renderItem = (product) => (
    <ListItem>
      <Body>
        <Text>{product.name} - {product.presentation} - {product.brand}</Text>
        <Text note>Stock: {product.count} / Precio unitario: {product.price}</Text>
      </Body>

      <Right>
        <Button success rounded small onPress={() => { Edit(product) }}>
          <Icon type='Entypo' name='edit' />
        </Button>
      </Right>
    </ListItem>
  );

  //Edit data with modal screen
  const [modalVisibility, setModalVisibility] = useState(false);
  const [productToEdit, setProductToEdit] = useState();

  const Edit = product => {
    setModalVisibility(true);
    setProductToEdit(product);
  };

  const backArrowAction = () => {
    setModalVisibility(false);
  }

  return (
    <View>
      <Modal
        animationType='slide'
        visible={modalVisibility}
        onRequestClose={backArrowAction}
      >
        <View style={{ flex:1 }} >
          <Button transparent style={{alignSelf:'center'}} onPress={() => setModalVisibility(false)} >
            <Icon type='AntDesign' name='closecircleo' />
          </Button>
          <EditScreen product={productToEdit} />
        </View>
      </Modal>

      <List>
        <FlatList
          initialNumToRender={10}
          data={dataArray}
          renderItem={({ item }) => renderItem(item)}
        />
      </List>
    </View>
  )
}