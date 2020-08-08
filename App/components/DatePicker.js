import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Button,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {connectDatePickerToStore} from '../store/ConnectHolder';
import moment from 'moment';

const DatePicker = (props) => {
  // console.log(props);
  // const [date, setDate] = useState(new Date(props.minDate));
  const [dateObject, setDateObject] = useState({
    start: props.minDate,
    end: props.maxDate,
  });
  const [type, setType] = useState('start');
  const [show, setShow] = useState(false);

  useEffect(
    () => {},
    //   setDateObject({
    //     start: props.minDate,
    //     end: props.maxDate,
    //   }),
    // [props],
  );
  // console.log(dateObject);
  const onChange = (event, selectedDate) => {
    // const currentDate = selectedDate || date;
    // console.log(Date.parse(selectedDate), event)
    if (!selectedDate) {
      setShow(Platform.OS === 'ios');
      return;
    }
    setShow(Platform.OS === 'ios');
    setDateObject({...dateObject, [type]: Date.parse(selectedDate)});
    type === 'start'
      ? props.setStartDate(Date.parse(selectedDate))
      : props.setEndDate(Date.parse(selectedDate));
    // setDate(currentDate);
  };

  const showStartDatePicker = () => {
    setType('start');
    setShow(true);
  };

  const showEndDatePicker = () => {
    setType('end');
    setShow(true);
  };
  return (
    <View style={styles.pickerContainer}>
      <View style={styles.pickerButton}>
        <TouchableOpacity
          style={styles.container}
          onPress={showStartDatePicker}>
          <Text style={styles.date}>
            {moment(dateObject.start || props.minDate).format('DD.MM.YYYY')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={{width: 20, borderWidth: 1, borderColor: '#ff4c13'}} />
      </View>
      <View style={styles.pickerButton}>
        <TouchableOpacity style={styles.container} onPress={showEndDatePicker}>
          <Text style={styles.date}>
            {moment(dateObject.end || props.maxDate).format('DD.MM.YYYY')}
          </Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          maximumDate={props.maxDate}
          minimumDate={props.minDate}
          value={
            type === 'start'
              ? new Date(dateObject.start)
              : new Date(dateObject.end)
          }
          mode={'date'}
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
      )}

      <TouchableOpacity
        style={[
          styles.container,
          {position: 'absolute', right: 20, top: 0, bottom: 0},
        ]}
        onPress={() => {
          setDateObject({
            start: props.minDate,
            end: props.maxDate,
          });
          props.setStartDate(props.minDate);
          props.setEndDate(props.maxDate);
        }}>
        <Icon name="cancel" style={{color: '#757575'}} size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgb(255,255,255)',
  },
  text: {
    color: 'rgb(34,150,243)',
    backgroundColor: 'rgb(255,255,255)',
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#cc001f',
  },
  container: {
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerButton: {
    // backgroundColor: 'rgb(255,255,255)',
    padding: 10,
    // borderWidth: 1,
    margin: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.21)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default connectDatePickerToStore(DatePicker);
