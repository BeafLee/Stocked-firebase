import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Form, Item, Input, Button, Text, Label, View, Icon } from 'native-base';

import * as firebase from 'firebase'
import AsyncStorage from '@react-native-community/async-storage';

const ProductEdit = props => {
  
  const product = props.product;
  const key = props.product.key; // Es el key que creó firebase

  const productFromFirebaseRef = firebase.database().ref('Products/' + key)

  const [newName, setNewName] = useState(product.name);
  const [newPresentation, setNewPresentation] = useState(product.presentation);
  const [newBrand, setNewBrand] = useState(product.brand);
  const [newCount, setNewCount] = useState(product.count);
  const [newPrice, setNewPrice] = useState(product.price);

  const editButton = () => {
    let updateProduct = {
      key: key,
      id: `${newName.toLowerCase()}-${newPresentation.toLowerCase()}-${newBrand.toLowerCase()}`,
      name: newName,
      presentation: newPresentation,
      brand: newBrand,
      count: newCount,
      price: newPrice,
    };
    productFromFirebaseRef.update(updateProduct);
    //console.log(productFromFirebase)
  };

  const deleteButton = (key) => {
    alert(key)
  }

  return (
    <View style={{flex: 1, justifyContent:'space-between'}}>
      <Form style={{ justifyContent: 'space-around'}}>
        <Item inlineLabel style={designs.item}>
          <Label style={designs.label}>Producto</Label>
          <Input onChangeText={(val) => setNewName(val)} defaultValue={product.name} style={designs.input} />
        </Item>
        <Item inlineLabel style={designs.item}>
          <Label style={designs.label}>Presentación</Label>
          <Input onChangeText={(val) => setNewPresentation(val)} defaultValue={product.presentation} style={designs.input} />
        </Item>
        <Item inlineLabel style={designs.item}>
          <Label style={designs.label}>Marca</Label>
          <Input onChangeText={(val) => setNewBrand(val)} defaultValue={product.brand} style={designs.input} />
        </Item>
        <Item inlineLabel style={designs.item}>
          <Label style={designs.label}>Cantidad</Label>
          <Input keyboardType='numeric' onChangeText={(val) => setNewCount(val)} defaultValue={product.count} style={designs.input} />
        </Item>
        <Item inlineLabel last style={designs.item}>
          <Label style={designs.label}>Precio</Label>
          <Input keyboardType='decimal-pad' onChangeText={(val) => setNewPrice(val)} defaultValue={product.price} style={designs.input} />
        </Item>
        <Button block rounded success iconLeft onPress={() => editButton(key)} style={designs.buttonEdit} >
          <Icon type='Entypo' name='edit' />
          <Text>Editar producto</Text>
        </Button>
      </Form>
      <Button rounded danger iconLeft onPress={() => deleteButton(key)} style={designs.buttonDelete} >
        <Icon name='trash' />
        <Text>Eliminar producto</Text>
      </Button>
    </View>
  )
};

const designs = StyleSheet.create({
  item: {
    //flex:1,
    flexDirection: 'row',
  },
  label: {
    flex: 100,
    //backgroundColor: 'white',
  },
  input: {
    flex: 215,
  },
  buttonEdit: {
    marginTop: 10,
    marginHorizontal: 8,
  },
  buttonDelete: {
    margin:20
  }
})

export default ProductEdit;