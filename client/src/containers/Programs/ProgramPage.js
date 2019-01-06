import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
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

    return (
      <div className={ styles.appContainer }>
        <Sidebar />
        <section className={ styles.pageContainer }>
          <Navbar />
          <div className={ styles.mainContainer }>
            <div className={ styles.contentContainer }>
              <h2 className={ styles.header }>
                { this.props.programId }
              </h2>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

function mapStateToProps({ auth }, props) {
  const { programId } = props.match.params

  return {
    auth,
    programId
  }
}

export default connect(mapStateToProps)(ProgramPage)
