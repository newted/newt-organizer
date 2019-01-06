import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading'
import LoadingBar from 'react-redux-loading'
// API
import { fetchUser } from '../actions/authedUser'
import { fetchPrograms } from '../actions/programs'
// Components
import Landing from './Landing'
import Dashboard from './Dashboard'
import ProgramList from './Programs/ProgramList'
import AddProgram from './Programs/AddProgram'
import ProgramPage from './Programs/ProgramPage'

class App extends Component {
  async componentDidMount() {
    await this.props.showLoading()
    await this.props.fetchUser()
    await this.props.fetchPrograms()
    await this.props.hideLoading()
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
                <Route path='/programs/:programId' component={ ProgramPage } />
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

const mapDispatchToProps = {
  showLoading,
  hideLoading,
  fetchUser,
  fetchPrograms
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
