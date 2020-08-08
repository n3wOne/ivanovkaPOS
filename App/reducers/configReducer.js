const initialState = {
  fetchUrl: 'http://vk.ferma-ivanovka.ru/api',
  numColumns: 3,
  errors: [],
};

export function ConfigReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_FETCH_URL':
      return {...state, fetchUrl: action.payload};
    case 'SET_NUM_COLUMNS':
      return {...state, numColumns: action.payload};
    case 'SAVE_CONFIG_FAILED':
      return {...state, errors: [...state.errors, action.payload]}
    case 'SAVE_CONFIG_SUCCESS':
      return {...state, ...action.payload}
    case 'LOAD_CONFIG_SUCCESS':
      return {...state, ...action.payload}
    case 'LOAD_CONFIG_ERROR':
      return {...state, errors: [...state.errors, action.payload]}
    default:
      return {...state};
  }
}
