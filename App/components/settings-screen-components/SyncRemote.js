import {connectToStore} from '../../store/ConnectHolder';
import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

class SyncRemote extends React.Component {
  constructor(props) {
    super(props);
  }

  readLocalStorage = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      const filtered = keys.filter((item) => item.match(/\d+/));
      const storageData = await AsyncStorage.multiGet(filtered);
      this.props.setLocalStorage(storageData);
      // console.log(storageData);
    } catch (e) {
      console.log('cant read storage keys');
    }
  };

  readRemoteStorage = async () => {
    const {fetchUrl} = this.props.config;
    try {
      const fetchParams = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await fetch(`${fetchUrl}/getRemoteStorage.php`, fetchParams)
        .then((res) => res.json())
        .then((resp) => this.props.setRemoteStorage(resp))
        .catch((e) => console.log('Error fetching remote storage', e));
    } catch (e) {
      console.log('Error', e);
    }
  };

  mergeData = async () => {
    try {
      const {localStorage, remoteStorage} = this.props;
      const localStorageKeys = [...localStorage.keys()];
      const stringifiedRemoteStorage = [...remoteStorage]
        .filter(([itemKey]) => !localStorageKeys.includes(itemKey))
        .map(([key, value]) => [key, JSON.stringify(value)]);
      await AsyncStorage.multiMerge(stringifiedRemoteStorage);
      console.log('Merge Successful');
    } catch (e) {
      console.log('Failed to merge storage', e);
    }
  };

  render() {
    return (
      <>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.readLocalStorage()}>
          <Text>Получить данные из локального хранилища</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.readRemoteStorage()}>
          <Text>Получить данные из удаленного хранилища</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.mergeData()}>
          <Text>Синхронизировать локальное и удаленное хранилища</Text>
        </TouchableOpacity>
      </>
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

export default connectToStore(SyncRemote);
