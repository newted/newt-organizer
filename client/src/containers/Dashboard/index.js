import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Components
import {
  MainContainer,
  HeaderContainer
} from "../../components/Page/Containers";
import { PageHeader } from "../../components/Page/Headers";
import { MessageBox, MessageLink } from "../../components/Page/MessageBox";
import Loader from "../../components/Loader";
import Timeline from "./Timeline";
// API
import { fetchAllCourses } from "../../actions/courses";

class Dashboard extends Component {
  static propTypes = {
    // Connect props
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  };

  renderContent() {
    const { programs } = this.props;

    if (_.isEmpty(programs.items)) {
      return (
        <MessageBox>
          You aren't in any programs. Go to the{" "}
          <MessageLink to="/programs">Programs</MessageLink> page from the
          sidebar to create a Program.
        </MessageBox>
      );
    }

    return <Timeline />;
  }

  render() {
    const { isFetching, items } = this.props.programs;
    if (isFetching && _.isEmpty(items)) {
      return <Loader />;
    }

    return (
      <MainContainer>
        <HeaderContainer>
          <PageHeader>Dashboard</PageHeader>
        </HeaderContainer>
        {this.renderContent()}
      </MainContainer>
    );
  }
}

function mapStateToProps({ programs }) {
  return {
    programs
  };
}

const mapDispatchToProps = {
  fetchAllCourses
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
