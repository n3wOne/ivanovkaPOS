import {
  Button,
  Pressable,
  Text,
  View,
  Modal,
  TextInput,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import NumericInput from './NumericInput';
import {connectToStore} from '../../store/ConnectHolder';

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weight: 1,
      showModal: false,
      count: 0,
    };
  }

  render() {
    const {
      item,
      addProductToCart,
      cart,
      setCartItemCount,
      cartItems,
      numColumns,
    } = this.props;
    const itemInCart = cartItems.has(item.id);
    const itemCount = itemInCart ? cart.cartItems.get(item.id).count : 0;
    return (
      <Pressable
        style={{
          ...styles.item,
          height: Dimensions.get('window').width / numColumns,
        }}
        onPress={() =>
          itemInCart
            ? setCartItemCount({...item, count: itemCount + 1})
            : addProductToCart(item)
        }>
        <View
          style={{
            alignSelf: 'center',
            flex: 1,
            flexGrow: 2,
            marginBottom: 20,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'flex-end',
            justifyItems: 'center',
          }}>
          <Text style={{position:"absolute", top: 10, right: 0}}>{item.price}</Text>
          <Text style={{color: '#000', fontSize: 16, textAlign: 'center'}}>
            {item.name}
          </Text>
        </View>
        {itemInCart ? (
          <NumericInput
            item={item}
            value={itemCount}
            onChange={setCartItemCount}
          />
        ) : (
          <View style={{flex: 1}} />
        )}
        <Image
          source={item.imgUrl}
          style={styles.image}
          resizeMethod={'resize'}
          resizeMode={'cover'}
        />
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: Dimensions.get('window').width - 40,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: "row",
    flex: 1,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  image: {
    position: 'absolute',
    zIndex: -10,
    width: '100%',
    height: '100%',
    // resizeMode: 'contain',
    opacity: 0.2,
  },
});

export default connectToStore(Item);
