import React, { Component } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import './Dashboard.css'

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <Sidebar />
        <div className="content-container">
          <h3>Dashboard</h3>
        </div>
      </div>
    )
  }
}

export default Dashboard
