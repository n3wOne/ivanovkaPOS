import * as React from 'react';
import {Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connectToStore} from '../../store/ConnectHolder';

class Invoice extends React.Component {
  async createInvoice() {
    const {
      cart: {cartItems},
    } = this.props;
    if (![...cartItems.values()].length > 0) {
      return;
    }
    const obj = [...cartItems.values()].map(({name, price, count}) => {
      return {
        name,
        count,
        total: (price * count).toFixed(),
        price,
      };
    });
    // await this.storeData(obj);
    this.props.newInvoice(obj);
    this.props.clearCart();
    // console.log(obj);
  }

  storeData = async (value) => {
    try {
      // console.log('VALUE', value);
      await AsyncStorage.setItem(`@Some_value`, JSON.stringify(value));
    } catch (e) {
      console.log('saving error');
    }
  };

  render() {
    return (
      <>
        <Button
          title={`Создать заказ (${this.props.cart.cartTotal})`}
          onPress={() => this.createInvoice()}
        />
        <Button
          title={'Очистить корзину'}
          onPress={() => this.props.clearCart()}
        />
      </>
    );
  }
}

// export default function Wrapped(props) {
//   const navigation = useNavigation();
//   const Component = connectToStore(Invoice);
//
//   return <Component {...props} navigation={navigation} />;
// }

export default connectToStore(Invoice);
