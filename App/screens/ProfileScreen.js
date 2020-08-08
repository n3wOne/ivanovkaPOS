//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import {Button, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//import all the basic component we have used

const FETCH_URL = 'http://192.168.0.102';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      storageData: [],
      response: {},
    };
  }

  fetchQuery = async () => {
    const {storageData} = this.state;
    // console.log(storageData);
    const fetchParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(storageData),
    };
    // console.log(JSON.stringify(storageData));
    try {
      await fetch(`${FETCH_URL}/sync.php`, fetchParams)
        .then((res) => res.json())
        .then((resp) => console.log(resp))
        .then((resp) => this.setState({response: resp}))
        .then((resp) => console.log(this.state.response))
        .catch((e) => console.log('error', e));
      const keys = [...new Map(this.state.response).keys()];
      const newMap = new Map(
        this.state.response.map(([key, value]) => [
          key,
          JSON.stringify(value.data),
        ]),
      );
      let currentlyMerged;
      try {
        // await AsyncStorage.multiMerge(multiMerge);
        // currentlyMerged = await AsyncStorage.multiGet(['@MyApp_USER_1', '@MyApp_USER_2'])
      } catch (e) {
        console.log("Can't merge =(", e);
      }
      console.log(keys, this.state.response, [...newMap]);
    } catch (e) {
      console.log('Error', e);
    }
  };

  readStorage = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      const filtered = keys.filter((item) => item.match(/\d+/));
      const storageData = await AsyncStorage.multiGet(filtered);
      if (!storageData.length > 0) {
        return;
      }
      this.setState({
        loading: false,
        storageKeys: filtered,
        storageData: storageData,
      });
    } catch (e) {
      console.log('cant read storage keys');
    }
  };

  syncWithServer = async () => {
    await this.readStorage();
    await this.fetchQuery();
  };

  sendRequest = async () => {
    console.log('SENDING REQUEST');
    console.log(this.state.storageData);
    const fetchData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: '123576',
        value: 'somevalue here',
      }),
    };
    try {
      await fetch('http://192.168.0.102/insert.php', fetchData)
        .then((res) => res.json())
        .then((resp) => console.log(resp))
        .catch((e) => console.log(e));
    } catch (e) {
      console.log('ERROR', e);
    }
  };
  render() {
    console.log(this.state);
    return (
      <View>
        <Button title={'Sync'} onPress={this.syncWithServer} />
        <Button title={'send request'} onPress={this.sendRequest} />
      </View>
    );
  }
}
