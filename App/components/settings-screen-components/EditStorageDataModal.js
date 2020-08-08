import * as React from 'react';
import {
  Button,
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
  TextInput,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {connectToStore} from '../../store/ConnectHolder';

class EditStorageDataModal extends React.Component {
  constructor(props) {
    super();
    this.state = {
      editItem: props.cart.editItem || {
        id: '',
        name: '',
        price: '',
        description: '',
        imgUrl: null,
      },
    };
  }

  handleChange = (name) => {
    return (event) => {
      const value = event.nativeEvent.text;
      const newValue =
        name === 'price' || name === 'id' ? parseFloat(value) : value;
      this.setState({
        editItem: {...this.state.editItem, [name]: newValue},
      });
    };
  };

  createTwoButtonAlert = () =>
    Alert.alert(
      `Удаление`,
      `Удалить элемент: ${this.state.editItem.name}?`,
      [
        {
          text: 'Отмена',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            this.props.removeItem(this.state.editItem);
            this.props.hideEditModal();
          },
        },
      ],
      {cancelable: false},
    );

  renderChildren = (editItem) => {
    // const {editItem} = this.state;
    // if (!editItem) {
    //   return <Text>No data</Text>;
    // }
    const {name = '', id = '', description = '', price = '', imgUrl = null} =
      editItem || {};
    return (
      <View
        key={`render-children - ${id}`}
        style={{
          flex: 1,
          flexDirection: 'column',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View key={`name-${name}`} style={styles.item}>
          <Text style={styles.text}>{'Название'}</Text>
          <TextInput
            returnKeyLabel={'name'}
            onChange={this.handleChange('name')}
            style={styles.textInput}
            defaultValue={name}
          />
        </View>
        <View key={`description-${description}`} style={styles.item}>
          <Text style={styles.text}>{'Описание'}</Text>
          <TextInput
            returnKeyLabel={'description'}
            onChange={this.handleChange('description')}
            style={styles.textInput}
            defaultValue={description}
          />
        </View>
        <View key={`price-${price}`} style={styles.item}>
          <Text style={styles.text}>{'Стоимость'}</Text>
          <TextInput
            keyboardType={'numeric'}
            returnKeyLabel={'price'}
            onChange={this.handleChange('price')}
            style={styles.textInput}
            defaultValue={`${price}`}
          />
        </View>
        <View key={`id-${id}`} style={styles.item}>
          <Text style={styles.text}>{'Идентификатор'}</Text>
          <TextInput
            returnKeyLabel={'id'}
            keyboardType={'numeric'}
            onChange={this.handleChange('id')}
            style={styles.textInput}
            defaultValue={`${id}`}
          />
        </View>
      </View>
    );
  };

  render() {
    const {item, hideEditModal, cart, saveEdit, removeItem} = this.props;
    const {showModal, editItem} = cart;
    return (
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.centeredView}>
          <ScrollView style={[styles.modalView, {flexDirection: 'column'}]}>
            <View style={{flex: 1}}>{this.renderChildren(editItem)}</View>
            <View style={styles.buttonsWrapper}>
              <TouchableOpacity
                style={[styles.button, styles.closeButton]}
                onPress={() => hideEditModal()}>
                <Text style={styles.buttonText}>Закрыть</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={() => {
                  saveEdit(this.state.editItem);
                  hideEditModal();
                }}>
                <Text style={styles.buttonText}>Сохранить</Text>
              </TouchableOpacity>
            </View>
            <Button
              title={'УДАЛИТЬ'}
              onPress={() => this.createTwoButtonAlert()}
            />
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    // flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'stretch',
    // alignContent: 'stretch',
    // flexWrap: 'nowrap',
    // flexDirection: 'row',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: `#000000`,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    // width: 300,
    flex: 1,
    margin: 15,
  },
  saveButton: {
    backgroundColor: 'rgb(87,255,146)',
  },
  closeButton: {
    backgroundColor: 'rgb(255,93,64)',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: Dimensions.get('window').width - 40,
    maxHeight: Dimensions.get('window').height - 100,
    backgroundColor: 'white',
    padding: 10,
  },
  text: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    flexGrow: 2,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    // height: 20,
    padding: 0,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'flex-start',
    flex: 1,
    margin: 5,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
});

export default connectToStore(EditStorageDataModal);
