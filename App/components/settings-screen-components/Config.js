import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Pressable,
  TextInput,
} from 'react-native';
import {connectConfigToStore} from '../../store/ConnectHolder';

const Config = (props) => {
  const [config, setConfig] = useState({
    fetchUrl: props.fetchUrl,
    numColumns: props.numColumns,
  });

  const handleChange = (name) => {
    return (value) => {
      // console.log(event);6
      const newValue =
        name === 'numColumns' ? parseFloat(value) || 3 : value.toString();
      setConfig({...config, [name]: newValue});
    };
  };
  return (
    <ScrollView style={{flex: 1, flexDirection: 'column'}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={style.text}>Fetch URL</Text>
        <TextInput
          returnKeyType="done"
          defaultValue={props.fetchUrl.toString()}
          onChangeText={handleChange('fetchUrl')}
          style={style.inputPlusMinus}
          // ref={(ref) => (this.ref = ref)}
          // value={this.state.stringValue}
          // onFocus={() => this.setState({value: null, stringValue: ''})}
          onEndEditing={() => props.setConfig(config)}
        />
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={style.text}>Number Columns</Text>
        <TextInput
          returnKeyType="done"
          keyboardType="numeric"
          defaultValue={props.numColumns.toString()}
          onChangeText={handleChange('numColumns')}
          style={style.inputPlusMinus}
          onEndEditing={() => props.setConfig(config)}
          // ref={(ref) => (this.ref = ref)}
          // value={this.state.stringValue}
          // onFocus={() => this.setState({value: null, stringValue: ''})}
          // onEndEditing={(e) =>
          //   this.props.onChange({
          //     count: parseFloat(e.nativeEvent.text),
          //   })
        />
      </View>
    </ScrollView>
  );
};

export default connectConfigToStore(Config);
const style = StyleSheet.create({
  text: {
    flex: 1,
  },
  inputPlusMinus: {
    flex: 1,
    flexGrow: 2,
    textAlign: 'center',
    padding: 0,
    fontSize: 16,
    color: 'rgb(255, 105, 0)',
    fontWeight: 'bold',
    borderBottomWidth: 1,
  },
});
