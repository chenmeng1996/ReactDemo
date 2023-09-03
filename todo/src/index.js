import App from './components/App'
import { Provider } from 'react-redux'
import React from 'react'
import { createStore } from 'redux'
import { render } from 'react-dom'
import todoApp from './reducers'

let store = createStore(todoApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)