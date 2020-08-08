const initialState = {
  startDate: 0,
  endDate: 0,
  maxDate: 0,
  minDate: 0,
};

export function DatePickerReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_DATE':
      return {...state, [action.payload.name]: action.payload.value};
    case 'SET_START_DATE':
      return {...state, startDate: action.payload};
    case 'SET_END_DATE':
      return {...state, endDate: action.payload};
    case 'SET_MAX_DATE':
      return {...state, maxDate: action.payload};
    case 'SET_MIN_DATE':
      return {...state, minDate: action.payload};
    default:
      return {...state};
  }
}
