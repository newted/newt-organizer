import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// Components
import Timeline from './Timeline'
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

  renderContent() {
    const programLink = (
      <Link to="/programs" className={styles.link}>Programs</Link>
    )

    if (Object.keys(this.props.programs.items).length > 0) {
      return <Timeline />
    } else {
      return (
        <div className={ styles.message }>
          You aren't in any programs. Go to the { programLink } page from the
          sidebar to create a Program.
        </div>
      )
    }
  }

  render() {
    return (
      <div className={ styles.mainContainer }>
        <div className={ styles.contentContainer }>
          <h2 className={ styles.header }>Dashboard</h2>
          { this.renderContent() }
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth, programs }) {
  return {
    auth,
    programs
  }
}

export default connect(mapStateToProps)(Dashboard)
