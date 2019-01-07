import React, { Component } from 'react'
import _ from 'lodash'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
// Components
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Button from '../../components/Button'
// Styling
import styles from './ProgramPage.module.css'

class ProgramPage extends Component {
  renderContent() {
    return (
      <div className={ styles.contentContainer }>
        <div className={ styles.headerContainer }>
          <div className={ styles.headings }>
            <h2 className={ styles.header }>
              { this.props.program.name }
            </h2>
            <h2 className={ styles.institution }>
              { this.props.program.institution }
            </h2>
          </div>
          <Button
            text='Edit'
            additionalClass={ styles.editBtn }
          />
        </div>
      </div>
    )
  }

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
            { this.renderContent() }
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
