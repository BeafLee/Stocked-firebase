import React, { useState, useEffect } from 'react';
import { Text, Form, Item, Input, Button } from 'native-base';

//import AsyncStorage from '@react-native-community/async-storage';
import * as firebase from 'firebase';

const ProductCreator = ({ navigation }) => {

  const [data, setData] = useState();
  
  const productListRef = firebase.database().ref('Products');

  const getData = () => {
    let productList;
    productListRef.on('value', (snapshot) => {
      //console.log(snapshot);
      if (snapshot.exists() == true) {
        productList = snapshot.val(); //agrega el atributo key que genero firebase
        let productListArray = Object.values(productList);
        setData(productListArray);
      }
    })
  }
  
  const storeNewProduct = (product) => {
    const newKey = productListRef.push().key;
    product.key = newKey;
    productListRef.child(newKey).set(product);
    //console.log('product stored');
  };
  
  useEffect(() => {
    getData();
  }, [])

  const [newName, setNewName] = useState();
  const [newPresentation, setNewPresentation] = useState();
  const [newBrand, setNewBrand] = useState();
  const [newCount, setNewCount] = useState();
  const [newPrice, setNewPrice] = useState();
  
  const addButton = () => {
    let newProduct = {
      id: `${newName.toLowerCase()}-${newPresentation.toLowerCase()}-${newBrand.toLowerCase()}`,
      name: newName,
      presentation: newPresentation,
      brand: newBrand,
      count: newCount,
      price: newPrice,
    };
    let isNew = false;
    
    if (data != null) {
      if (!data.some(product => product.id == newProduct.id)) {
        storeNewProduct(newProduct);
        navigation.goBack();
        isNew = true;
      }
    } else {
      storeNewProduct(newProduct);
      navigation.goBack();
      isNew = true;
    }
    
    isNew !== true ? alert('Producto existente, por favor ingrese otro producto') : null;
  }

  return (
    <Form>
      <Item >
        <Input placeholder='Producto' onChangeText={(val) => setNewName(val)} />
      </Item>
      <Item >
        <Input placeholder='Presentación' onChangeText={(val) => setNewPresentation(val)} />
      </Item>
      <Item >
        <Input placeholder='Marca' onChangeText={(val) => setNewBrand(val)} />
      </Item>
      <Item >
        <Input placeholder='Cantidad' keyboardType='numeric' onChangeText={(val) => setNewCount(val)} />
      </Item>
      <Item last>
        <Input placeholder='Precio' keyboardType='decimal-pad' onChangeText={(val) => setNewPrice(val)} />
      </Item>
      <Button block rounded style={{ alignItems: 'flex-end', backgroundColor: '#AC0000' }} onPress={addButton} ><Text>Agregar producto</Text></Button>
    </Form>
  )
}

export default ProductCreator;