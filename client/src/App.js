import React from 'react'
import { Outlet } from 'react-router-dom'
export default class App extends React.Component {
  componentDidMount = () => {
    const location = window.location

    if (location.pathname === '/') {
      window.location.assign(`${location.href}articles`)
    }
  }
  
  render() {
    return (
      <div className="test-task">
        <Outlet />
      </div>
    )
  }
}
