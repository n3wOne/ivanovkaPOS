import * as React from 'react';
import {Button, View, Text, ScrollView} from 'react-native';
import {
  connectDatePickerToStore,
  connectToStore,
} from '../../store/ConnectHolder';
import AsyncStorage from '@react-native-community/async-storage';
import {getDateString, clearStorage} from '../../utils';

class DataFromStorage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // loading: true,
      storageKeys: [],
      storageData: [],
      showTotal: false,
      total: 0,
    };
  }
  async componentDidMount() {
    // console.log('COMPONENT DID MOUNT');
    await this.readStorage();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log('COMPONENT DID UPDATE', this.props);
    this.getTotal();
    await this.readStorage();
  }

  getTotal() {
    const {localStorage} = this.props;
    // const { storageData } = this.state;
    // console.log(storageData, [...storageData.values()])

    const filtered = [...localStorage.entries()].filter(
      ([key, value]) =>
        new Date(parseFloat(key)) >= new Date(this.props.startDate) &&
        new Date(parseFloat(key)) <= new Date(this.props.endDate),
    );

    const total = [...new Map(filtered).values()].reduce(
      (acc, curr) =>
        acc + curr.reduce((ac, {total}) => ac + parseFloat(total), 0),
      0,
    );
    // console.log('TOTAL', total, this.state.total);
    this.setState({total});
  }

  readStorage = async () => {
    let keys = [];
    // this.getTotal();
    try {
      keys = await AsyncStorage.getAllKeys();
      if (!keys) {
        return;
      }
      const filtered = keys.filter((item) => item.match(/\d+/));
      const storageData = await AsyncStorage.multiGet(filtered);
      if (!storageData.length > 0) {
        return;
      }

      if (this.state.storageKeys.length !== storageData.length) {
        const dataArray = filtered.map((item) => parseInt(item));
        const minDate = Math.min(...dataArray);
        const maxDate = Math.max(...dataArray);
        this.props.setMinDate(minDate);
        this.props.setMaxDate(maxDate);
        this.setState({
          // loading: false,
          storageKeys: filtered,
          storageData: storageData,
        });
      }
    } catch (e) {
      console.log('cant read storage keys');
    }
  };

  totalStatistics() {
    const {storageData} = this.state;
    if (!storageData.length > 0) {
      return;
    }
    const data = new Map([]);
    const newData = new Map(storageData);
    if (!newData.size > 0) {
      return;
    }
    [...newData.values()].forEach((item) => {
      const parsedItem = JSON.parse(item);
      if (!parsedItem.length > 0) {
        return;
      }
      parsedItem.forEach(({name, total, count, price}) => {
        if (data.get(name)) {
          const {
            total: dataTotal,
            count: dataCount,
            price: dataPrice,
          } = data.get(name);
          data.set(name, {
            total: +dataTotal + +count * dataPrice,
            count: +dataCount + +count,
            price: +dataPrice,
          });
        } else {
          data.set(name, {
            total,
            count,
            price,
          });
        }
      });
    });
    const renderdata = [...data.entries()].map(([key, value]) => {
      return (
        <View key={`storage-${key}`} style={{flex: 1, flexDirection: 'row'}}>
          <Text style={{flex: 3}}>{key}</Text>
          <Text style={{flex: 1}}>{value.count}</Text>
          <Text style={{flex: 1}}>{value.total}</Text>
        </View>
      );
    });

    return <View>{renderdata}</View>;
  }

  renderStorageItems = () => {
    const {storageData} = this.state;
    if (!storageData.length > 0) {
      return;
    }
    return storageData
      .filter(
        ([key, value]) =>
          new Date(parseFloat(key)) >= new Date(this.props.startDate) &&
          new Date(parseFloat(key)) <= new Date(this.props.endDate),
      )
      .sort(([k, v], [k1, v1]) => parseFloat(k) - parseFloat(k1))
      .reverse()
      .map(([key, value]) => {
        if (!value) {
          return null;
        }
        const item = JSON.parse(value);
        const date = parseInt(key);
        if (!item && !item.length > 0) {
          return null;
        }
        return (
          <View
            key={`${key}`}
            style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20}}>
            <Text style={{flex: 2}}>{getDateString(date)}</Text>
            <View style={{flex: 3, flexDirection: 'column'}}>
              {item.map(({name, total, count}, index) => (
                <View
                  key={`${name}-${index}`}
                  style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                  <Text style={{flex: 3}}>{name}</Text>
                  <Text style={{flex: 1}}>{count}</Text>
                  <Text style={{flex: 1}}>{total}</Text>
                </View>
              ))}
            </View>
          </View>
        );
      });
  };

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <Button
          title={this.state.showTotal ? 'Полная из хранилища' : 'По заказам'}
          onPress={() => this.setState({showTotal: !this.state.showTotal})}
        />
        {this.state.storageData.length > 0 ? (
          this.state.showTotal ? (
            this.totalStatistics()
          ) : (
            this.renderStorageItems()
          )
        ) : (
          <Text>No storage data</Text>
        )}
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'right',
              margin: 20,
            }}>
            Общая сумма: {this.state.total}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

export default connectToStore(connectDatePickerToStore(DataFromStorage));
