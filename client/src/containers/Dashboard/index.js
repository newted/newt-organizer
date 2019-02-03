import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// Styling
import styles from './Dashboard.module.css'

class Dashboard extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    // Connect props
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  }

  render() {
    // Redirect to Landing page if not authenticated
    if(!this.props.auth) {
      return <Redirect to='/' />
    }

    return (
      <div className={ styles.mainContainer }>
        <div className={ styles.contentContainer }>
          <h2 className={ styles.header }>Dashboard</h2>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Dashboard)
