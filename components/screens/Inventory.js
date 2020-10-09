import React, { useState, useEffect } from 'react';
import { Container, Text, Button, View } from 'native-base';
import * as firebase from 'firebase';

import { ProductList } from '../snippets/ProductList';
import NavOptionsFab from '../snippets/NavOptionsFab';

const Inventory = ({ navigation }) => {

  const [ data, setData ] = useState();
  const [ productNumber, setProductNumber ] = useState(0);

  const productListRef = firebase.database().ref('Products');

  const getData = () => {
    let productList;
    productListRef.on('value', (snapshot) => {
      if ( snapshot.exists() == true ) {
        productList = snapshot.val();
        let productListArray = Object.values(productList);
        setData(productListArray);
        setProductNumber(productListArray.length);
      }
    })
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container style={{flex:1}}>
      <View style={{flex: 68}}>
        <ProductList data={data}/>
      </View>

      <View style={{flex: 12, alignItems: 'center', justifyContent:'center', backgroundColor:'skyblue'}}>
        <Text style={{fontSize:24}} >Hay {productNumber} productos</Text>
      </View>
      <NavOptionsFab navigation={navigation} />
    </Container>
  )
};

export default Inventory;