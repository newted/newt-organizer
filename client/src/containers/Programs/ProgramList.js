import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
// API
import { fetchPrograms } from '../../actions/programs'
// Components
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Button from '../../components/Button'
// Styling
import styles from './ProgramList.module.css'

class ProgramList extends Component {
  componentDidMount() {
    this.props.fetchPrograms()
  }

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
                <h2 className={ styles.header }>Programs</h2>
                <Link to='/programs/new'>
                  <Button
                    text='Add Program'
                    additionalClass={ styles.addBtn }
                  />
                </Link>
              </div>
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

export default connect(mapStateToProps, { fetchPrograms })(ProgramList)
