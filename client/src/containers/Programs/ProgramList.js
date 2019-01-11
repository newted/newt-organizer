import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
// API
import { fetchPrograms } from '../../actions/programs'
// Components
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Button from '../../components/Button'
import Card from '../../components/Card'
// Styling
import styles from './ProgramList.module.css'
import { UniversityIcon } from '../../utils/icons'

class ProgramList extends Component {
  componentDidMount() {
    this.props.fetchPrograms()
  }

  renderCards() {
    const { programs } = this.props

    return _.map(programs.items, ({ _id, name, shortname, institution }) => {
      return (
        <Card
          path={ `/programs/${_id}` }
          title={ name }
          subtitle={ institution }
          icon={ UniversityIcon }
          additionalClass={ styles.cardColor }
          key={ _id }
        />
      )
    })
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
                <h2>Programs</h2>
                <Link to='/programs/new'>
                  <Button
                    text='Add Program'
                    additionalClass={ styles.addBtn }
                  />
                </Link>
              </div>
              <div className={ styles.cardContainer }>
                { this.renderCards() }
              </div>
            </div>
          </div>
        </section>
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

export default connect(mapStateToProps, { fetchPrograms })(ProgramList)
