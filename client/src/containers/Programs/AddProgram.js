import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// Components
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import ProgramForm from './ProgramForm'
// Styling
import styles from './AddProgram.module.css'

class AddProgram extends Component {
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
                <h3 className={ styles.header }>Add a New Program</h3>
              </div>
              <ProgramForm />
            </div>
          </div>
        </section>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(AddProgram)
