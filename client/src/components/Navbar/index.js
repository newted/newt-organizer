import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// Components
import Button from '../Button'
// Styling
import styles from './Navbar.module.css'

class Navbar extends Component {
  // Render Login or Logout based on authentication state
  renderButtons() {
    switch(this.props.auth) {
      case null:
        return
      case false:
        return (
          <a href="/auth/google">
            <Link to='/login'>
              <Button additionalClass={ styles.loginBtn }>
                Sign in
              </Button>
            </Link>
          </a>
        )
      default:
        return (
          <div className={ styles.navbarBtns }>
            {/* If Landing page and logged in, show 'To Dashboard' link */}
            { this.props.theme === 'landing' && (
              <Link to='/dashboard'>
                <div className={ styles.toDash }>
                  Go to Dashboard
                </div>
              </Link>
            )}
            <a href="/api/logout">
              <Button additionalClass={ styles.logoutBtn }>
                Logout
              </Button>
            </a>
          </div>
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
          <Link
            to='/'
            style={{ color: this.props.theme === 'landing' ? 'white' : 'black' }}
          >
            Newt
          </Link>
          { this.renderButtons() }
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
