import React, { Component } from "react"
import '@babel/polyfill'
import store from './store'
import { Provider } from 'react-redux'
import MySidebar from './components/MySidebar'


class SidebarApp extends Component {
  render () {
    return (
      <Provider store={store}>
          <div>
            <MySidebar />
          </div>
      </Provider>
    );
  }
}

export default SidebarApp;