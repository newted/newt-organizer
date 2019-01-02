import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { fetchUser } from '../actions/authedUser'

import Landing from './Landing'
import Dashboard from './Dashboard'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    console.log(this.props)
    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar />
          { this.props.loading === true
            ? null
            : <Switch>
                <Route exact path ='/' component={ Landing } />
                <Route path='/dashboard' component={ Dashboard } />
              </Switch>
          }
        </Fragment>
      </BrowserRouter>
    )
  }
}

function mapStateToProps({ auth }) {
  return {
    loading: auth === null
  }
}

export default connect(mapStateToProps, { fetchUser })(App)
