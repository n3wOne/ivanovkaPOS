import * as React from 'react';
import {Button, View, Text, ScrollView} from 'react-native';
import {connectToStore} from '../store/ConnectHolder';
import DataFromStorage from '../components/statistics/DataFromStorage';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import StatisticsDaily from '../components/statistics/StatisticsDaily';
import DatePicker from '../components/DatePicker';

const Tabs = createMaterialTopTabNavigator();

class StatisticScreen extends React.Component {
  navigationTabs = () => {
    return (
      <>
        <DatePicker />
        <Tabs.Navigator>
          <Tabs.Screen name={'Дневная'} component={StatisticsDaily} />
          <Tabs.Screen name={'Полная'} component={DataFromStorage} />
        </Tabs.Navigator>
      </>
    );
  };

  render() {
    return <View style={{flex: 1}}>{this.navigationTabs()}</View>;
  }
}

export default connectToStore(StatisticScreen);
