import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './Navbar.module.css'

class Navbar extends Component {
  // Render Login or Logout based on authentication state
  renderButton() {
    switch(this.props.auth) {
      case null:
        return
      case false:
        return (
          <a href="/auth/google">
            <button className={ `${styles.btn} ${styles.logoutBtn}` }>
              Login with Google
            </button>
          </a>
        )
      default:
        return (
          <a href="/api/logout">
            <button className={ `${styles.btn} ${styles.logoutBtn}` }>
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
        return styles.lightBlueNavbar
      default:
        return styles.lightGreyNavbar
    }
  }

  render() {
    return (
      <nav className={ `${styles.navbarContainer} ${this.renderNavbarColor()}` }>
        <div className={ styles.navbar }>
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
