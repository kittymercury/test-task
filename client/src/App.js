import React from 'react'
import { Outlet } from 'react-router-dom'
export default class App extends React.Component {
  render() {
    return (
      <div className="test-task">
        <Outlet />
      </div>
    )
  }
}
