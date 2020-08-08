// Imports: Dependencies
import {combineReducers} from 'redux';
// Imports: Reducers
import {CartReducer} from './rootReducer';
import {StorageReducer} from './storageReducer';
import {ConfigReducer} from './configReducer';
import {DatePickerReducer} from './datePickerReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  date: DatePickerReducer,
  storage: StorageReducer,
  cart: CartReducer,
  config: ConfigReducer,
});
// Exports
export default rootReducer;
