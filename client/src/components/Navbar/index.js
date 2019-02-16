import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// API
import { signOut } from '../../actions/authedUser'
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
          <Link to='/login'>
            <Button additionalClass={ styles.loginBtn }>
              Sign in
            </Button>
          </Link>
        )
      default:
        return (
          <div className={ styles.navbarBtns }>
            {/* If Landing page and logged in, show 'To Dashboard' link */}
            {
              this.props.theme === 'landing'
              ? <Fragment>
                  <Link to='/dashboard'>
                    <div className={ styles.toDash }>
                      Go to Dashboard
                    </div>
                  </Link>
                  <Button
                    additionalClass={ styles.loginBtn }
                    onClick={ this.props.signOut }
                  >
                    Log out
                  </Button>
                </Fragment>
              : <Button
                  additionalClass={ styles.logoutBtn }
                  onClick={ this.props.signOut }
                >
                  Log out
                </Button>
            }
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

export default connect(mapStateToProps, { signOut })(Navbar)
