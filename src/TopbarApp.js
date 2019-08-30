import React, { Component } from "react"
import '@babel/polyfill'
import store from './store'
import { Provider } from 'react-redux'
import MyTopbar from './components/MyTopbar'


class TopbarApp extends Component {
  render () {
    return (
      <Provider store={store}>
          <div className="App">
            <MyTopbar />
          </div>
      </Provider>
    );
  }
}

export default TopbarApp;