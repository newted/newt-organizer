import React, { Component } from 'react'
import { connect } from 'react-redux'
// Components
import Navbar from '../../components/Navbar'
import Button from '../../components/Button'
// API
import { authenticateWithGoogle } from '../../actions/authedUser'
// Styling
import styles from './Login.module.css'

class Login extends Component {
  render() {
    const { history, authenticateWithGoogle } = this.props
    
    return (
      <div>
        <Navbar theme='landing' />
        <div className={ styles.container }>
          <div className={ styles.panel }>
            <h3 className={ styles.panelHeader }>Sign in</h3>
            <div className={ styles.panelBody }>
              <ul>
                <li className={ styles.providerBtn }>
                  <a href="/auth/google">
                    <Button additionalClass={ `${styles.loginBtn} ${styles.googleBtn}` }>
                      Sign In with Google
                    </Button>
                  </a>
                </li>
                <li className={ styles.providerBtn }>
                  <Button
                    additionalClass={ `${styles.loginBtn} ${styles.firebaseBtn}` }
                    onClick={ () => authenticateWithGoogle(history) }
                  >
                    Sign In With Google - Firebase
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { authenticateWithGoogle })(Login)
