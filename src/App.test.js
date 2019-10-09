import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = mockStore({ balances: {} })
  ReactDOM.render(<Provider store={store}>
    <App action={() => {}}/>
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
