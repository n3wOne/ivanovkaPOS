import {Button, ScrollView, Text, View} from 'react-native';
import {getDateString} from '../../utils';
import AsyncStorage from '@react-native-community/async-storage';
import {connectToStore} from '../../store/ConnectHolder';
import * as React from 'react';

class StatisticsDaily extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTotal: false,
      showStorage: true,
      total: 0,
    };
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    await this.readValue();
    // console.log('DID UPDATE');
    this.getTotal();
  }

  getTotal() {
    const {
      cart: {invoices},
    } = this.props;

    const total = [...invoices.values()].reduce(
      (acc, curr) =>
        acc + curr.reduce((ac, {total}) => ac + parseFloat(total), 0),
      0,
    );
    // console.log(total);
    this.setState(total);
  }

  totalStatistics() {
    const {
      cart: {invoices},
    } = this.props;

    const data = new Map([]);

    [...invoices.values()].forEach((item) => {
      item.forEach(({name, total, count, price}) => {
        if (data.get(name)) {
          const {
            total: dataTotal,
            count: dataCount,
            price: dataPrice,
          } = data.get(name);
          data.set(name, {
            total: dataTotal + count * dataPrice,
            count: dataCount + count,
            price: dataPrice,
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
        <View
          key={key}
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{key}</Text>
          <Text>{value.count}</Text>
          <Text>{value.total}</Text>
        </View>
      );
    });

    return <View style={{flex: 1, flexDirection: 'column'}}>{renderdata}</View>;
  }

  renderStatistic() {
    const {
      cart: {invoices},
    } = this.props;

    const data = [...invoices.entries()].map(([key, value]) => {
      return (
        <View
          key={key}
          style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20}}>
          <Text style={{flex: 2}}>{getDateString(key)}</Text>
          <View style={{flex: 3, flexDirection: 'column'}}>
            {value.map(({name, total, count}, index) => (
              <View
                key={`${key}-${name}`}
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
    return (
      <ScrollView style={{flex: 1, flexDirection: 'column'}}>{data}</ScrollView>
    );
  }

  readValue = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      console.log('Error reading storage');
    }
  };

  statisticsDaily() {
    return (
      <>
        <Button
          title={this.state.showTotal ? 'Общая' : 'По заказам'}
          onPress={() => this.setState({showTotal: !this.state.showTotal})}
        />
        {this.state.showTotal ? this.totalStatistics() : this.renderStatistic()}
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
      </>
    );
  }

  render() {
    return this.statisticsDaily();
  }
}

export default connectToStore(StatisticsDaily);
