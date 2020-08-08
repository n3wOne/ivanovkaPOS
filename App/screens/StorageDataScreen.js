import * as React from 'react';
import {
  Button,
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import {connectToStore} from '../store/ConnectHolder';
import Item from '../components/home-screen-components/Item';
import EditStorageDataModal from '../components/settings-screen-components/EditStorageDataModal';

class StorageDataScreen extends React.Component {
  renderItem = ({item, index}) => {
    const {addProductToCart, setCartItemCount, showEditModal} = this.props;
    return (
      <Pressable
        key={`${item.name}${index}`}
        style={styles.item}
        onPress={() => showEditModal(item)}>
        <Text style={styles.title}>{item.name}</Text>
      </Pressable>
    );
  };

  render() {
    const {data, cart} = this.props;
    return (
      <>
        {cart.showModal ? <EditStorageDataModal /> : null}
        <FlatList
          key={'storageDataKey'}
          data={data}
          style={styles.container}
          renderItem={this.renderItem}
        />
        <Button title={'Добавить'} onPress={() => this.props.showEditModal()} />
      </>
    );
  }
}

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
    // flexDirection: "row",
    flex: 1,
    margin: 5,
    // height: Dimensions.get('window').width / numColumns, // approximate a square
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

export default connectToStore(StorageDataScreen);
