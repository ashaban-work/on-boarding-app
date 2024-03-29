import React from 'react'
import { render } from 'react-dom'
import SidebarApp from './SidebarApp'
import client from './modules/client'

const root = document.querySelector('#root')

client.on('app.registered', function({context}) {
  render(<SidebarApp context={context}/>, root)
})

