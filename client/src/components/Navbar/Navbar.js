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

  render() {
    return (
      <nav className="navbar-container">
        <div className="navbar">
          <div>Navbar</div>
          { this.renderButton() }
        </div>
      </nav>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Navbar)
