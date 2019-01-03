import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// Components
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
// Styling
import '../../styles/shared.css'
import './Dashboard.css'

class Dashboard extends Component {
  render() {
    // Redirect to Landing page if not authenticated
    if(!this.props.auth) {
      return <Redirect to='/' />
    }

    return (
      <div className="app-container">
        <Sidebar />
        <section className="page-container">
          <Navbar />
          <div className="main-container">
            <div className="content-container">
              <h3>Dashboard</h3>
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

export default connect(mapStateToProps)(Dashboard)
