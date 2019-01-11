import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// Components
import AddProgramForm from './AddProgramForm'
// API
import { submitProgram } from '../../actions/programs'
// Styling
import styles from './AddProgram.module.css'

class AddProgram extends Component {
  render() {
    // Redirect to Landing page if not authenticated
    if(!this.props.auth) {
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
