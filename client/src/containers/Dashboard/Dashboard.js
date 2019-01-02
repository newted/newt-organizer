import React, { Component } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import './Dashboard.css'

class Dashboard extends Component {
  render() {
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

export default Dashboard
