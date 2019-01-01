import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUser } from '../actions/authedUser'

import Navbar from './Navbar/Navbar'
const Landing = () => <h2>Landing</h2>
const Dashboard = () => <h2>Dashboard</h2>
const Login = () => <h2>Login</h2>

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Route exact path ='/' component={ Landing } />
          <Route path='/dashboard' component={ Dashboard } />
          <Route path='/login' component={ Login } />
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(null, { fetchUser })(App)
