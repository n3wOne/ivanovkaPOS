import React, {Component} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import {create, PREDEF_RES} from 'react-native-pixel-perfect';
import {Keyboard} from 'react-native'

let calcSize = create(PREDEF_RES.iphone7.px);

function _handlePress(callback) {
  requestAnimationFrame(callback);
}

const Button = (props) => {
  return Platform.OS === 'ios' ? (
    <TouchableOpacity
      disabled={props.disabled}
      style={props.style}
      onPress={() => _handlePress(props.onPress)}>
      {props.children}
    </TouchableOpacity>
  ) : (
    <TouchableNativeFeedback
      disabled={props.disabled}
      onPress={() => _handlePress(props.onPress)}>
      <View style={props.style}>{props.children}</View>
    </TouchableNativeFeedback>
  );
};

Button.defaultProps = {
  onPress: () => {},
};

export default class NumericInput extends Component {
  constructor(props) {
    super(props);
    this.ref = null;
    this.state = {
      value: props.value || 1,
      stringValue: (props.value ? props.value : 1).toString(),
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log(this.props.value)
    if (this.props.value !== prevProps.value) {
      this.onChange(this.props.value);
      console.log(this.props.value)
    }
  }

  inc = () => {
    let value = this.state.value;
    value = value + 1;
    this.setState({value, stringValue: value.toString()});
    this.props.onChange({
      ...this.props.item,
      count: value,
    });
  };
  dec = () => {
    let value = this.state.value;
    value = value - 1;
    this.setState({value, stringValue: value.toString()});
    this.props.onChange({
      ...this.props.item,
      count: value,
    });
  };

  onChange = (value) => {
    // console.log(this.props.value)
    this.setState({value: parseFloat(value), stringValue: value});
  };

  render() {
    const borderColor = this.props.borderColor;
    const iconStyle = [style.icon, this.props.iconStyle];
    const totalWidth = this.props.totalWidth;
    const totalHeight = this.props.totalHeight
      ? this.props.totalHeight
      : totalWidth * 0.4;
    const inputWidth =
      this.props.type === 'up-down' ? totalWidth * 0.6 : totalWidth * 0.4;
    const fontSize = totalHeight * 0.38;
    const textColor = this.props.textColor;
    const inputContainerStyle = [
      style.inputContainerPlusMinus,
      {flex: 1},
      // {width: totalWidth, height: totalHeight, borderColor: borderColor},
    ];
    const {item} = this.props;
    return (
      <View style={style.inputContainerStyle}>
        <Button onPress={this.dec} style={style.leftButtonStyle}>
          <Icon name="md-remove" size={fontSize} style={[...iconStyle]} />
        </Button>
        <View style={style.inputWraperStyle}>
          <TextInput
            returnKeyType="done"
            keyboardType="numeric"
            defaultValue={this.props.value.toString()}
            onChangeText={this.onChange}
            style={style.inputPlusMinus}
            ref={(ref) => (this.ref = ref)}
            value={this.state.stringValue}
            onFocus={() => this.setState({value: null, stringValue: ''})}
            onEndEditing={(e) =>
              this.props.onChange({
                ...item,
                count: parseFloat(e.nativeEvent.text),
              })
            }
          />
        </View>
        <Button onPress={this.inc} style={style.rightButtonStyle}>
          <Icon name="md-add" size={fontSize} style={[...iconStyle]} />
        </Button>
      </View>
    );
  }
}

const style = StyleSheet.create({
  seprator: {
    backgroundColor: 'grey',
    height: calcSize(80),
  },
  inputContainerStyle: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgb(255, 105, 0)',
    borderWidth: 1,
  },
  inputWraperStyle: {
    flex: 1.5,
    borderWidth: 0,
  },
  inputContainerPlusMinus: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
  },
  inputPlusMinus: {
    flex: 1,
    flexGrow: 2,
    textAlign: 'center',
    padding: 0,
    fontSize: 16,
    color: 'rgb(255, 105, 0)',
    fontWeight: 'bold',
    borderWidth: 0,
  },
  leftButtonStyle: {
    // position: 'absolute',
    flex: 1,
    zIndex: -1,
    left: 0,
    // height: totalHeight - 2,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#cc5a38',
    // width: (totalWidth - inputWidth) / 2,
    borderColor: 'rgb(255, 105, 0)',
    borderRightWidth: 1,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    // borderWidth: 1,
  },
  rightButtonStyle: {
    // position: 'absolute',
    flex: 1,
    zIndex: -1,
    right: 0,
    // height: totalHeight - 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderWidth: 1,
    // backgroundColor: '#a6cc2b',
    borderColor: 'rgb(255, 105, 0)',
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 1,
    // width: (totalWidth - inputWidth) / 2,
  },

  icon: {
    fontWeight: '900',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'rgb(255, 105, 0)',
  },
});

NumericInput.defaultProps = {
  iconSize: calcSize(30),
  borderColor: '#d4d4d4',
  iconStyle: {},
  totalWidth: calcSize(200),
  sepratorWidth: 1,
  type: 'plus-minus',
  rounded: false,
  textColor: 'black',
  containerStyle: {},
  inputStyle: {},
  initValue: null,
  valueType: 'integer',
  value: null,
  minValue: null,
  maxValue: null,
  step: 1,
  upDownButtonsBackgroundColor: 'white',
  rightButtonBackgroundColor: 'white',
  leftButtonBackgroundColor: 'white',
  editable: true,
  validateOnBlur: true,
  reachMaxIncIconStyle: {},
  reachMaxDecIconStyle: {},
  reachMinIncIconStyle: {},
  reachMinDecIconStyle: {},
  onLimitReached: (isMax, msg) => {},
  extraTextInputProps: {},
};
