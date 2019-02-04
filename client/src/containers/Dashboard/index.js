import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Link } from 'react-router-dom'
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

  renderMessage() {
    const programLink = (
      <Link to="/programs" className={styles.link}>
        Programs
      </Link>
    )
    const courseLink = (
      <Link to='/courses' className={ styles.link }>
        Courses
      </Link>
    )
    const constructionEmoji = (
      <span role='img' aria-label='construction'>🚧</span>
    )

    if (Object.keys(this.props.programs.items).length > 0) {
      return (
        <div className={styles.message}>
          This page is still under construction { constructionEmoji }. Check out
          the { programLink } and { courseLink } pages.
        </div>
      )
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
    // Redirect to Landing page if not authenticated
    if(!this.props.auth) {
      return <Redirect to='/' />
    }

    return (
      <div className={ styles.mainContainer }>
        <div className={ styles.contentContainer }>
          <h2 className={ styles.header }>Dashboard</h2>
          { this.renderMessage() }
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
