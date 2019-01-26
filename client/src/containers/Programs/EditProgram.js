import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// API
import { updateProgram } from '../../actions/programs'
// Components
import EditProgramForm from './EditProgramForm'
// Styling
import styles from './EditProgram.module.css'

class EditProgram extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    program: PropTypes.shape({
      courses: PropTypes.array,
      dateCreated: PropTypes.string,
      institution: PropTypes.string,
      name: PropTypes.string,
      shortname: PropTypes.string,
      _id: PropTypes.string,
      _user: PropTypes.string
    }),
    updateProgram: PropTypes.func.isRequired,
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
          <div className={ styles.headerContainer }>
            <h3>Edit Program</h3>
          </div>
          <EditProgramForm
            program={ this.props.program }
            onSubmit={ this.props.updateProgram }
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth, programs }, props) {
  const { programId } = props.match.params
  const program = _.filter(
    programs.items,
    program => program._id === programId
  )[0]

  return {
    auth,
    program
  }
}

export default connect(mapStateToProps, { updateProgram })(EditProgram)
