import React from 'react'
import { render } from 'react-dom'
import App from './App'
import client from './modules/client'

const root = document.querySelector('#root')

client.on('app.registered', function({context}) {
  render(<App context={context}/>, root)
})

