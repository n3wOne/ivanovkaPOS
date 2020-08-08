import Icon from 'react-native-vector-icons/Ionicons';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import {connectToStore} from './store/ConnectHolder';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import Invoice from './components/home-screen-components/Invoice';
import StatisticScreen from './screens/StatisticScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import EditStorageData from './screens/StorageDataScreen';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs(['Warning']);

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Главная"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Feed"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Главная',
          tabBarIcon: () => <Icon name={'home'} size={25} />,
        }}
      />
      <Tab.Screen
        name="StatisticScreen"
        lazy={true}
        component={StatisticScreen}
        options={{
          tabBarLabel: 'Статистика',
          tabBarIcon: () => <Icon name={'md-stats-chart-outline'} size={25} />,
        }}
      />
      <Tab.Screen
        name="StorageDataScreen"
        component={EditStorageData}
        lazy={true}
        options={{
          tabBarLabel: 'Данные',
          tabBarIcon: () => <IconMC name={'database-settings'} size={25} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        lazy={true}
        options={{
          tabBarLabel: 'Настройки',
          tabBarIcon: () => <Icon name={'md-settings'} size={25} />,
        }}
      />

      {/*<Tab.Screen*/}
      {/*  name="Profile"*/}
      {/*  component={ProfileScreen}*/}
      {/*  lazy={true}*/}
      {/*  options={{*/}
      {/*    tabBarLabel: 'Profile',*/}
      {/*  }}*/}
      {/*/>*/}
    </Tab.Navigator>
  );
}

// const FETCH_URL = 'http://192.168.0.102';

class RootComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connection: {},
    };
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
    try {
      const fetchParams = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await fetch(
        `${this.props.config.fetchUrl}/getRemoteStorage.php`,
        fetchParams,
      )
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
    } catch (e) {
      console.log('Failed to merge storage', e);
    }
  };

  async componentDidMount() {
    this.props.loadDataFromStore();
    await this.readLocalStorage();
    await this.props.loadConfig();
    // // console.log(networkState.isConnected)
    // if (networkState.isConnected) {
    //   await this.readRemoteStorage();
    //   await this.mergeData();
    // }
  }

  render() {
    return (
      <>
        <NavigationContainer>
          <MyTabs />
        </NavigationContainer>
        <Invoice />
      </>
    );
  }
}

export default connectToStore(RootComponent);
