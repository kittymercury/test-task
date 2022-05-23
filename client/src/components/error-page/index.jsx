import React from 'react'
import { Link } from 'react-router-dom'

export default class ErrorPage extends React.Component {
  render() {
    return (
      <div className="section">
        <div className="box">
          <div className="title is-2">Error! 🥺</div>
          <div className="title is-4">
            This page doesn't exist. Go to <Link to="/articles">main page</Link>
          </div>
        </div>
      </div>
    )
  }
}
