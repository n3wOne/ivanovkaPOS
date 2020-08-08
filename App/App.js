import {store} from './store';
import {Provider} from 'react-redux';

import * as React from 'react';
import RootComponent from './RootComponents';

import {LogBox} from 'react-native';

LogBox.ignoreAllLogs(['Warning']);
function App() {
  return (
    <Provider store={store}>
      <RootComponent />
    </Provider>
  );
}

export default App;
