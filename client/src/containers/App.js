import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
// API
import { fetchUser } from "../actions/authedUser";
// Components
import Loader from "../components/Loader";
import CustomToast from "../components/CustomToast";
import FourOhFour from "../components/404";
// Containers
import AppContainer from "./AppContainer";
import Landing from "./Landing";
import Login from "./Login";

const LandingContainer = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/login" component={Login} />
  </Switch>
);

class App extends Component {
  componentDidMount() {
    if (!this.props.auth.exists) {
      this.props.fetchUser().catch(error => console.log(error));
    }
  }

  renderContent() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={LandingContainer} />
          <Route exact path="/login" component={LandingContainer} />
          {/* If the paths are any of the ones in the array, render
            AppContainer (i.e. the app stuff that needs the sidebar) */}
          <Route
            path={[
              "/dashboard",
              "/programs",
              "/courses",
              "/assignments",
              "/profile"
            ]}
            component={AppContainer}
          />
          {/* If none of the paths match show the 404 page */}
          <Route component={FourOhFour} />
        </Switch>
      </Fragment>
    );
  }

  render() {
    return (
      <BrowserRouter>
        <ToastProvider
          autoDismissTimeout={6000}
          components={{ Toast: CustomToast }}
        >
          {this.props.loading === true ? <Loader /> : this.renderContent()}
        </ToastProvider>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    loading: auth.isFetching,
    auth
  };
}

const mapDispatchToProps = {
  fetchUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
