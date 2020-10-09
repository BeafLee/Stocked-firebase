import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Item, Input, Button, CheckBox, Container, View, Accordion } from 'native-base';
import * as firebase from 'firebase';

import { ProductList } from '../snippets/ProductList';

const productsRef = firebase.database().ref('Products');

//----------------------- Search Form -------------------------
const SearchForm = ({propsSearch, setPropsSearch}) => {

  //Consts and useState  
  const [checkedBox, setCheckedBox] = useState({
    name: propsSearch.name.boole, 
    presentation: propsSearch.presentation.boole, 
    brand: propsSearch.brand.boole
  });

  const [inputName, setInputName] = useState(propsSearch.name.value);
  const [inputPresentation, setInputPresentation] = useState(propsSearch.presentation.value);
  const [inputBrand, setInputBrand] = useState(propsSearch.brand.value);

  // Functions and useEffect
  useEffect(() => {
    setPropsSearch({
      name: {boole: checkedBox.name, value: inputName},
      presentation: {boole: checkedBox.presentation, value: inputPresentation},
      brand: {boole: checkedBox.brand, value: inputBrand},
    })
  }, [inputName, inputPresentation, inputBrand, checkedBox]);

  const checked = (box) => {
    let newCheckedBox = {
      name: box == 'name' ? !checkedBox.name : checkedBox.name,
      presentation: box == 'presentation' ? !checkedBox.presentation : checkedBox.presentation,
      brand: box == 'brand' ? !checkedBox.brand : checkedBox.brand,
    }
    setCheckedBox(newCheckedBox);
  }

  

  return (
    <View style={{ flex: 1 }}>
      <Item >
        <CheckBox checked={checkedBox.name} onPress={() => { checked('name') }} color='orange' />
        <Input disabled={!checkedBox.name} style={{ marginLeft: 15 }} placeholder='Producto' onChangeText={(value) => setInputName(value)} />
      </Item>
      <Item>
        <CheckBox checked={checkedBox.presentation} onPress={() => { checked('presentation') }} color='orange' />
        <Input disabled={!checkedBox.presentation} style={{ marginLeft: 15 }} placeholder='Presentación' onChangeText={(value) => setInputPresentation(value)} />
      </Item>
      <Item>
        <CheckBox checked={checkedBox.brand} onPress={() => { checked('brand') }} color='orange' />
        <Input disabled={!checkedBox.brand} style={{ marginLeft: 15 }} placeholder='Marca' onChangeText={(value) => setInputBrand(value)} />
      </Item>
    </View>

  )
}

//--------------- Filter Form -----------------------
const FilterForm = props => {
  //Consts and useState
  const [ filterData, setFilterData ] = useState(props.propsFilter);

  //Functions and useEffect
  useEffect(() => {
    props.setPropsFilter(filterData);
  }, [filterData])

  const checked = () => {
    setFilterData({count: {
      boole: !filterData.count.boole,
      value: filterData.count.value
    }})
  }
  const onChangeTextCount = (val) => {
    setFilterData({count: {
      boole: filterData.count.boole,
      value: val,
    }})
  }

  return(
    <View>
      <Item >
        <CheckBox checked={filterData.count.boole} onPress={checked} color='skyblue' />
        <Input disabled={!filterData.count.boole} style={{ marginLeft: 15 }} placeholder='Cantidad' onChangeText={(value) => onChangeTextCount(value)} defaultValue={filterData.count.value} />
      </Item>
    </View>
  )
}

const renderContent = (data, properties) => {
  switch (data) {
    case 'SearchForm':
      return <SearchForm propsSearch={properties.propsSearch} setPropsSearch={properties.setPropsSearch} />
    case 'FilterForm':
      return <FilterForm propsFilter={properties.propsFilter} setPropsFilter={properties.setPropsFilter} />
    case 'OrderForm':
      return <Text>Ordenar</Text>
    default:
      break;
  }
}

//------------------  MAIN ------------------------
const ProductSearch = props => { 

  //Const and useState
  const accordionData = [
    { title: 'Buscar Productos', content: 'SearchForm' },
    { title: 'Filtrar Productos', content: 'FilterForm' },
  ];

  const [productToShow, setProductToShow] = useState();

  const [propsSearch, setPropsSearch] = useState({
    name: { boole: false, value: '' },
    presentation: { boole: false, value: '' },
    brand: { boole: false, value: '' },
  });
  const [propsFilter, setPropsFilter] = useState({
    count: { boole: false, value: '' },
  });

  const [ properties, setProperties ] = useState({
    propsSearch,
    setPropsSearch,
    propsFilter,
    setPropsFilter
  })

  //Functions and useEffect
  useEffect(() => {
    setProperties({
      propsSearch,
      setPropsSearch,
      propsFilter,
      setPropsFilter
    })
  }, [propsSearch, setPropsSearch, propsFilter, setPropsFilter])

  const getData = () => {
    let productList;
    productsRef.on('value', (snapshot) => {
      //console.log(snapshot);
      if (snapshot.exists() == true) {
        productList = snapshot.val();
        let productListArray = Object.values(productList);
        setData(productListArray);
      }
    })
  }

  const combine = () => {
    let name = propsSearch.name.boole == true ? propsSearch.name.value : false;
    let presentation = propsSearch.presentation.boole == true ? propsSearch.presentation.value : false;
    let brand = propsSearch.brand.boole == true ? propsSearch.brand.value : false;

    let count = propsFilter.count.boole == true ? propsFilter.count.value : false;


  }

  const filterData = () => {
    //const pruebaURL = 
      productsRef              
        .orderByValue()
        //.startAt('-M')
        .on('value', (snapshot) => {
          console.log(snapshot.val())
        })
    //console.log(pruebaURL);
  }
 
  useEffect(() => {
    //console.log(productToShow);
    //filterData();
  }, [productToShow])

  const buttonSearch = () => {
    console.log(properties);
    alert('buscando');
  }

  return (
    <View style={{flex:1}}>
      <Accordion
        dataArray={accordionData}
        renderContent={({ content }) => renderContent(content, properties)}
      />
      <Button block rounded warning style={{ alignItems: 'flex-end' }} onPress={buttonSearch} >
        <Text>Buscar producto</Text>
      </Button>
      <View style={{flex:888888888}}>
        <ProductList data={productToShow} />
      </View>
    </View>
  )
}

export default ProductSearch;

/* const buttonSearch = () => {
  let newDataSearched = new Array;
  const n = checkedBox.name;
  const p = checkedBox.presentation;
  const b = checkedBox.brand;

  const allFalse = !n & !p & !b ? false : true;

  data.map(product => {
    const nameFilterCondition = n ? product.name == inputName : true;
    const presentationFilterCondition = p ? product.presentation == inputPresentation : true;
    const brandFilterCondition = b ? product.brand == inputBrand : true;

    if (nameFilterCondition && presentationFilterCondition && brandFilterCondition && allFalse) {
      newDataSearched.push(product);
    }
  })
  //setDataSearched(newDataSearched); //La lista que se va a mostrar
} */