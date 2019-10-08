import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './redux/reducers'
import mySaga from './redux/sagas'
import { Provider } from 'react-redux';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

const action = type => store.dispatch({type})

sagaMiddleware.run(mySaga)
function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App action={action}/>
    </Provider>
    , document.getElementById('root'));
}


render()
store.subscribe(render)
serviceWorker.unregister();
