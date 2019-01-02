import React, { Component } from 'react'
import Navbar from '../../components/Navbar'
import './Landing.css'

class Landing extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="landing-page">
          <div className="title-container">
            <h1 className="landing-title">newt</h1>
            <h3 className="landing-subtitle">Organizing your learning</h3>
          </div>
        </div>
      </div>

    )
  }
}

export default Landing
