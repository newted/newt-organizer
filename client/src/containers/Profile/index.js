import React, { Component } from 'react'
// Styling
import styles from './Profile.module.css'

class Profile extends Component {
  render() {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.contentContainer}>
          <h2 className={styles.header}>Profile</h2>
          <div className={styles.container}></div>
        </div>
      </div>
    );
  }
}

export default Profile
