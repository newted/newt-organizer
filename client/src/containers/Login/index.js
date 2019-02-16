import React from 'react'
// Components
import Navbar from '../../components/Navbar'
import Button from '../../components/Button'
// Styling
import styles from './Login.module.css'

const Login = () => (
  <div>
    <Navbar theme='landing' />
    <div className={ styles.container }>
      <div className={ styles.panel }>
        <h3 className={ styles.panelHeader }>Sign in</h3>
        <div className={ styles.panelBody }>
          <a href="/auth/google">
            <Button additionalClass={ styles.loginBtn }>
              Sign In with Google
            </Button>
          </a>
        </div>
      </div>
    </div>
  </div>
)

export default Login
