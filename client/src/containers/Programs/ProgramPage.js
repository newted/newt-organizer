import React, { Component } from 'react'
import _ from 'lodash'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
// Components
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
// Styling
import styles from './ProgramPage.module.css'

class ProgramPage extends Component {
  render() {
    // Redirect to Landing page if not authenticated
    if(!this.props.auth) {
      return <Redirect to='/' />
    }

    if (!this.props.program) {
      return <LoadingBar />
    }

    return (
      <div className={ styles.appContainer }>
        <Sidebar />
        <section className={ styles.pageContainer }>
          <Navbar />
          <div className={ styles.mainContainer }>
            <div className={ styles.contentContainer }>
              <h2 className={ styles.header }>
                { this.props.program.name }
              </h2>
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
    programId,
    program
  }
}

export default connect(mapStateToProps)(ProgramPage)
