import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// Components
import AddProgramForm from './AddProgramForm'
// API
import { submitProgram } from '../../actions/programs'
// Styling
import styles from './AddProgram.module.css'

class AddProgram extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    submitProgram: PropTypes.func.isRequired,
    // Connect props
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  }

  render() {
    // Redirect to Landing page if not authenticated
    if (!this.props.auth.exists) {
      return <Redirect to='/' />
    }

    return (
      <div className={ styles.mainContainer }>
        <div className={ styles.contentContainer }>
          <div className={ styles.headerContainer }>
            <h3>Add a New Program</h3>
          </div>
          <AddProgramForm
            onSubmit={ this.props.submitProgram }
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps, { submitProgram })(AddProgram)
