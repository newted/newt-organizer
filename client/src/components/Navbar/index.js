import React, { Component } from 'react'
import { connect } from 'react-redux'
// Components
import Button from '../Button'
// Styling
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
            <Button
              text='Login with Google'
              additionalClass={ styles.logoutBtn }
            />
          </a>
        )
      default:
        return (
          <a href="/api/logout">
            <Button
              text='Logout'
              additionalClass={ styles.logoutBtn }
            />
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
