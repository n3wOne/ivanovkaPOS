import React from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {connectToStore} from '../store/ConnectHolder';
import styled from 'styled-components/native';
import Item from '../components/home-screen-components/Item';
import Invoice from '../components/home-screen-components/Invoice';
import {LogBox} from 'react-native';
import Refresh from '../components/Refresh';

LogBox.ignoreAllLogs(['Warning']);

const StyledView = styled.View`
  flex: 1;
  width: 50%;
  height: 100px;
`;

// const numColumns = 3;

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: new Map([]),
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.cartItems !== prevProps.cartItems) {
      this.forceUpdate();
    }
  }

  formatData = (data, numColumns) => {
    const newData = [...data];
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      newData.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
      numberOfElementsLastRow++;
    }

    return newData;
  };

  renderItem = ({item, index}) => {
    const {
      addProductToCart,
      setCartItemCount,
      config: {numColumns},
    } = this.props;
    if (item.empty === true) {
      return (
        <View
          style={[
            styles.item,
            {height: Dimensions.get('window').width / numColumns},
            styles.itemInvisible,
          ]}
        />
      );
    }
    return (
      <Item
        cartItems={this.props.cartItems}
        cart={this.props.cart}
        style={styles}
        numColumns={numColumns}
        addProductToCart={addProductToCart}
        setCartItemCount={setCartItemCount}
        item={item}
      />
    );
  };

  render() {
    const {data: newData, config} = this.props;
    const {numColumns} = config;
    // console.log(numColumns);
    return !newData ? (
      <Text>Loading...</Text>
    ) : (
      <ScrollView keyboardDismissMode="on-drag">
        <FlatList
          nestedScrollEnabled={true}
          key={`flat-${numColumns}`}

          extraData={this.state.cartItems}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          data={this.formatData(newData, numColumns)}
          // data={newData}
          style={styles.container}
          renderItem={this.renderItem}
          numColumns={numColumns}
        />
      </ScrollView>
    );
  }
}

HomeScreen.defaultProps = {
  config: {
    numColumns: 3,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  image: {
    position: 'absolute',
    zIndex: -10,
    width: '100%',
    height: '100%',
    // resizeMode: 'contain',
    opacity: 0.2,
  },
  item: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // height: Dimensions.get('window').width / numColumns,
    // flexDirection: "row",
    flex: 1,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
});

export default connectToStore(HomeScreen);
