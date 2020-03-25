import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import configureStore from './configureStore'
import { User } from './types'

let user : User = {}
try {
  user = JSON.parse(localStorage.getItem('user') || '{}')
} catch(e) {
  console.error(e)
}
const store = configureStore({
  user: user,
  error: {},
})

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
) , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
