import React, { Component } from 'react'
import './Navbar.css'

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar-container">
        <div className="navbar">
          <div>Navbar</div>
          <button className="btn logout-btn">
            Login
          </button>
        </div>
      </nav>
    )
  }
}

export default Navbar
