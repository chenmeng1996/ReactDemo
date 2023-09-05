import React, { Component } from 'react'

import AsyncApp from './AsyncApp'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'

const store = configureStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <AsyncApp />
      </Provider>
    )
  }
}