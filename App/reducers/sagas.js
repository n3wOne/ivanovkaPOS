import {
  put,
  takeEvery,
  all,
  call,
  select,
  takeLatest,
} from 'redux-saga/effects';
import data from '../store/data';
import AsyncStorage from '@react-native-community/async-storage';

const saveEditedData = async (state, action) => {
  const newData = new Map(state.data.map((item) => [item.id, item]));
  newData.set(action.payload.id, action.payload);
  const newDataArray = [...newData.values()];
  // console.log("DATA ARRAY!", newDataArray);
  try {
    await AsyncStorage.setItem('@data', JSON.stringify(newDataArray));
  } catch (e) {
    console.log('Save error', e);
  }
};

const getNewData = async (state, action) => {
  // console.log("GET NEW DATA");
  await saveEditedData(state, action);
  const newData = await AsyncStorage.getItem('@data');
  return JSON.parse(newData);
};

export function* saveEdit(action) {
  const state = yield select();
  // console.log("STATE", state);
  try {
    const newData = yield getNewData(state.storage, action);
    // console.log(newData);
    yield put({type: 'SAVE_EDIT_DATA', payload: newData});
  } catch (e) {
    console.log('SOME ERROR!', e);
  }
}

const readLocalStorage = async () => {
  try {
    const storageData = await AsyncStorage.getItem('@data');
    if (!storageData) {
      try {
        await AsyncStorage.setItem('@data', JSON.stringify(data));
        return readLocalStorage();
      } catch (e) {
        console.log('Storage error: ', e);
      }
    }
    return storageData;
  } catch (e) {
    console.log('cant read storage keys');
  }
};

export function* loadDataFromStore() {
  try {
    const storageData = yield call(readLocalStorage);
    yield put({type: 'SET_STORAGE_DATA', payload: JSON.parse(storageData)});
  } catch (error) {
    yield put({type: 'SET_STORAGE_DATA_FAILED', error});
  }
}

function* setConfig(action) {
  try {
    yield AsyncStorage.setItem('@config', JSON.stringify(action.payload));
    yield put({type: 'SAVE_CONFIG_SUCCESS', payload: action.payload});
    // const storage = yield AsyncStorage.getItem("@config");
    // console.log(JSON.parse(storage));
  } catch (e) {
    console.error('Save config failed', e);
    yield put({type: 'SAVE_CONFIG_FAILED', e});
  }
}

function* loadConfig() {
  try {
    const storageData = yield AsyncStorage.getItem('@config');
    yield put({type: 'LOAD_CONFIG_SUCCESS', payload: JSON.parse(storageData)});
  } catch (e) {
    console.error('Failed to load config', e);
    yield put({type: 'LOAD_CONFIG_ERROR', e});
  }
}

export function* watchSaveConfig() {
  yield takeLatest('SET_CONFIG', setConfig);
}

export function* watchLoadConfigFromStorage() {
  yield takeLatest('LOAD_CONFIG', loadConfig);
}

export function* watchSaveData() {
  yield takeLatest('SAVE_EDIT', saveEdit);
}

export function* watchLoadDataFromStorage() {
  yield takeEvery('LOAD_DATA_FROM_STORAGE_START', loadDataFromStore);
}

export default function* rootSaga() {
  yield all([
    loadDataFromStore(),
    watchLoadDataFromStorage(),
    watchSaveData(),
    watchSaveConfig(),
    watchLoadConfigFromStorage(),
  ]);
}
