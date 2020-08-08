import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  localStorage: new Map([]),
  remoteStorage: new Map([]),
  data: [],
  errors: [],
};

export function StorageReducer(state = initialState, action) {
  switch (action.type) {
    case 'REMOVE_ITEM':
      // const newState = state.data.filter((item) => item.id !== action.payload.id);
      // console.log(newState);
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload.id),
      };
    case 'SAVE_EDIT_DATA':
      return {...state, data: action.payload};
    case 'SET_STORAGE_DATA':
      return {...state, data: action.payload};
    case 'SET_STORAGE_DATA_FAILED':
      return {...state, errors: [...action.payload]};
    case 'SET_LOCAL_STORAGE':
      return {
        ...state,
        localStorage: new Map(
          action.payload.map(([key, value]) => [key, JSON.parse(value)]),
        ),
      };
    case 'LOAD_LOCAL_STORAGE':
      return {...state};
    case 'LOAD_LOCAL_STORAGE_SUCCESS':
      return;
    case 'LOAD_ERROR':
      return;
    case 'SET_REMOTE_STORAGE':
      return {
        ...state,
        remoteStorage: new Map(
          action.payload.map(([key, value]) => [key, value.data]),
        ),
      };
    case 'LOAD_REMOTE_STORAGE':
      return;
    case 'LOAD_REMOTE_STORAGE_SUCCESS':
      return;
    default:
      return {...state};
  }
}
