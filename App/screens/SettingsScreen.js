//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import Config from '../components/settings-screen-components/Config';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  ScrollView,
} from 'react-native';
import {clearStorage} from '../utils';
import {connectToStore} from '../store/ConnectHolder';
import ImagePicker from 'react-native-image-picker';
import SyncRemote from '../components/settings-screen-components/SyncRemote';
import AsyncStorage from '@react-native-community/async-storage';
//import all the basic component we have used
const FETCH_URL = 'http://192.168.0.102';

class SettingsScreen extends React.Component {
  //Setting Screen to show in Setting Option

  async fetchAllProducts() {
    try {
      const fetchParams = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.props.data),
      };
      await fetch(`${this.props.config.fetchUrl}/syncProducts.php`, fetchParams)
        .then((res) => res.json())
        .then((resp) => console.log(resp))
        // .then((resp) => this.props.setRemoteStorage(resp))
        .catch((e) => console.log('Error fetching remote storage', e));
    } catch (e) {
      console.log('Error', e);
    }
  }

  fetchQuery = async () => {
    const {localStorage} = this.props;
    const storageData = [...localStorage.entries()].map(([key, value]) => [
      key,
      JSON.stringify(value),
    ]);
    // console.log(localStorage, storageData);
    const fetchParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(storageData),
    };
    // console.log(fetchParams, this.props, JSON.stringify(storageData));
    try {
      // let keyss = await AsyncStorage.getAllKeys();
      // console.log(keyss);
      // const filtered = keyss.filter((item) => item.match(/\d+/));
      // const storageData = await AsyncStorage.multiGet(filtered);

      const response = await fetch(
        `${this.props.config.fetchUrl}/sync.php`,
        fetchParams,
      )
        .then((res) => res.json())
        // .catch((e) => console.log('error', e))
        .then((resp) => console.log(resp))
        .then((resp) => resp)
        // .then((resp) => console.log("somres", resp))
        .catch((e) => console.log('error', e));
      if (!response || response.error) {
        return;
      }
      // const keys = [...new Map(response).keys()];
      // console.log("RESPONSE", response);
      const newMap = new Map(
        response.map(([key, value]) => [key, JSON.stringify(value.data)]),
      );
      // let currentlyMerged;
      try {
        await AsyncStorage.multiMerge(newMap);
        // currentlyMerged = await AsyncStorage.multiGet(['@MyApp_USER_1', '@MyApp_USER_2'])
      } catch (e) {
        console.log("Can't merge =(", e);
      }
      // console.log(keys, [...newMap]);
    } catch (e) {
      console.log('Error', e);
    }
  };

  showPicker = () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });
      }
    });
  };

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <Text style={{marginTop: 50, fontSize: 25}}>Настройки</Text>
        <Config />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => clearStorage()}>
            <Text>Очистить хранилище</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.fetchQuery()}>
            <Text>Синхронизировать заказы</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.fetchAllProducts()}>
            <Text>Синхронизировать список продуктов</Text>
          </TouchableOpacity>
          <View style={styles.button} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.showPicker()}>
            <Text>НЕ НАЖИМАТЬ!</Text>
          </TouchableOpacity>
          <SyncRemote />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});

export default connectToStore(SettingsScreen);
