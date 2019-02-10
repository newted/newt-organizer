import React from 'react'
// Components
import Navbar from '../../components/Navbar'
// Styling
import styles from './Login.module.css'

const Login = () => (
  <div>
    <Navbar theme='landing' />
    <div className={ styles.container }>
      <div className={ styles.titleContainer }>
        <h3 className={ styles.subtitle }>Sign in</h3>
      </div>
    </div>
  </div>
)

export default Login
