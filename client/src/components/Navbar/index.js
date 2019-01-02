import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Navbar.css'

class Navbar extends Component {
  // Render Login or Logout based on authentication state
  renderButton() {
    switch(this.props.auth) {
      case null:
        return
      case false:
        return (
          <a href="/auth/google">
            <button className="btn logout-btn">
              Login with Google
            </button>
          </a>
        )
      default:
        return (
          <a href="/api/logout">
            <button className="btn logout-btn">
              Logout
            </button>
          </a>
        )
    }
  }

  // Render navbar background color based on whether it's landing page or not
  renderNavbarColor() {
    switch(this.props.theme) {
      case 'landing':
        return "light-blue-navbar"
      default:
        return "light-grey-navbar"
    }
  }

  render() {
    return (
      <nav className={ "navbar-container " + this.renderNavbarColor() }>
        <div className="navbar">
          <div>Navbar</div>
          { this.renderButton() }
        </div>
      </nav>
    )
  }
}

function mapStateToProps({ auth }, { theme }) {
  return {
    auth,
    theme
  }
}

export default connect(mapStateToProps)(Navbar)
