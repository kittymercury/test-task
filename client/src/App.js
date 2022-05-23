import React from 'react'
import { Outlet } from 'react-router-dom'

export default class App extends React.Component {
  componentDidMount = () => {
    if (window.location.pathname === '/') {
      window.location.assign(`http://${process.env.REACT_APP_HOSTNAME}:3000/articles`)
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
