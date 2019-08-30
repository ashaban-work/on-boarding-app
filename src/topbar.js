import React from 'react'
import { render } from 'react-dom'
import TopbarApp from './TopbarApp'
import client from './modules/client'

const root = document.querySelector('#root')

client.on('app.registered', function({context}) {
  render(<TopbarApp context={context}/>, root)
})

