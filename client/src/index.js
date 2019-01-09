import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.css'

import App from './containers/App'
import reducers from './reducers'
import middleware from './middleware'

import axios from 'axios'
window.axios = axios

const store = createStore(reducers, {}, middleware)

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);
