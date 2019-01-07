import React, { Component } from 'react'
import _ from 'lodash'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// API
import { updateProgram } from '../../actions/programs'
// Components
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import EditProgramForm from './EditProgramForm'
// Styling
import styles from './EditProgram.module.css'

class EditProgram extends Component {
  render() {
    // Redirect to Landing page if not authenticated
    if(!this.props.auth) {
      return <Redirect to='/' />
    }

    return (
      <div className={ styles.appContainer }>
        <Sidebar />
        <section className={ styles.pageContainer }>
          <Navbar />
          <div className={ styles.mainContainer }>
            <div className={ styles.contentContainer }>
              <div className={ styles.headerContainer }>
                <h3 className={ styles.header }>Edit Program</h3>
              </div>
              <EditProgramForm
                info={ this.props.program }
                onSubmit={ this.props.updateProgram }
              />
            </div>
          </div>
        </section>
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
