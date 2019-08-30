import React, { Component } from "react"
import '@babel/polyfill'
import store from './store'
import { Provider } from 'react-redux'
import HomePage from './components/HomePage'


class SidebarApp extends Component {
  render () {
    return (
      <Provider store={store}>
          <div className="App">
            <HomePage />
          </div>
      </Provider>
    );
  }
}

export default SidebarApp;