import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUser } from '../actions/authedUser'

import Landing from './Landing'
import Dashboard from './Dashboard'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path ='/' component={ Landing } />
          <Route path='/dashboard' component={ Dashboard } />
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(null, { fetchUser })(App)