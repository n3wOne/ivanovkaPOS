import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

export function getDateString(dateString) {
  // console.log(moment(dateString));
  const wrapDate = (date) => (date > 9 ? date : '0' + date);
  const parseDate = new Date(dateString);
  const hour = wrapDate(parseDate.getHours()),
    minutes = wrapDate(parseDate.getMinutes()),
    seconds = wrapDate(parseDate.getSeconds()),
    month = wrapDate(parseDate.getMonth()),
    year = parseDate.getFullYear(),
    day = wrapDate(parseDate.getDay());

  // return `${day}.${month}.${year} ${hour}:${minutes}:${seconds}`;
  return moment(dateString).format('DD.MM.YY HH:mm:ss');
}
// console.log(Date.now(), new Date())

export const mapToArrayObject = (map) => {
  return [...map.values()].map(([key, value]) => value);
};

export const arrayToMap = (array) => {
  return new Map(array.map((item) => [item.id, item]));
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('CLEAR SUCCESS');
  } catch (e) {
    console.log('Something goes wrong, storage has been not cleared');
  }
};