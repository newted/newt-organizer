import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
// API
import { fetchUser } from '../actions/authedUser'
// Components
import Landing from './Landing'
import Dashboard from './Dashboard'
import ProgramList from './Programs/ProgramList'
import AddProgram from './Programs/AddProgram'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar />
          { this.props.loading === true
            ? null
            : <Switch>
                <Route exact path ='/' component={ Landing } />
                <Route path='/dashboard' component={ Dashboard } />
                <Route path='/programs/new' component={ AddProgram } />
                <Route path='/programs' component={ ProgramList } />
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
