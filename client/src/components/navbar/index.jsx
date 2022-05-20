import React from 'react'
import { Link } from 'react-router-dom'

import './styles.scss'

export default class Navbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isDropdownActive: false
    }
  }

  handleClickMore = () => {
    const { isDropdownActive } = this.state
    
    if (!isDropdownActive) {
      this.setState({ isDropdownActive: true })
    } else {
      this.setState({ isDropdownActive: false })
    }
  }

  renderNavbar = () => {
    const { isDropdownActive } = this.state

    if (this.props.articleId) {
      if (this.props.isEditMode) {
        return (
          <nav className="navbar">
            <button className="button">Save</button>
            <button className="button">Cancel</button>
          </nav>
        )
      } else {
        return (
          <nav className="navbar">
            <div className="navbar-brand">
              <button className="navbar-item back" onClick={() => this.props.onClickBack()}>
                <Link to='/articles'>Back</Link>
              </button>
            </div>
            <div className="navbar-item has-dropdown">
              <div className="navbar-link" onClick={this.handleClickMore}>More</div>
              <div className={`navbar-dropdown ${isDropdownActive ? 'is-active' : ''}`}>
                <div className="navbar-item">
                  Edit
                </div>
                <div className="navbar-item">
                  Delete
                </div>
              </div>
            </div>
          </nav>
        )
      }
    }
    
    if (!this.props.articleId) {
      return (
        <nav className="navbar">
          <div className="heading">Articles</div>
          <button className="button add">+</button>
        </nav>
      )
    }
  }

  render() {
    return this.renderNavbar()
  }
}
