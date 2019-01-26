import React from 'react'
// Components
import Navbar from '../../components/Navbar'
// Styling
import styles from './Landing.module.css'

const Landing = () => (
  <div>
    <Navbar theme='landing' />
    <div className={ styles.container }>
      <div className={ styles.titleContainer }>
        <h1 className={ styles.title }>newt</h1>
        <h3 className={ styles.subtitle }>Organizing your learning</h3>
      </div>
    </div>
  </div>
)

export default Landing
