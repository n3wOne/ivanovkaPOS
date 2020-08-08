// Imports: Dependencies
import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
// Imports: Redux
import rootSaga from '../reducers/sagas';
import rootReducer from '../reducers';
// // Middleware: Redux Persist Persisted Reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);
// Redux: Store
const sagaMiddleware = createSagaMiddleware();
const middlewares = [
    // logger,
    sagaMiddleware];
const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);
// Middleware: Redux Persist Persister
// Exports
export {store};
