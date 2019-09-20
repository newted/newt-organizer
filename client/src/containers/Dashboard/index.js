import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
// Components
import {
  MainContainer,
  HeaderContainer,
  ContentContainer
} from "../../components/PageContainers";
import MessageBox from "../../components/MessageBox";
import Loader from "../../components/Loader";
import Timeline from "./Timeline";

const Dashboard = ({ isFetching, userContents }) => {
  if (isFetching) {
    return <Loader />;
  }

  return (
    <MainContainer>
      <HeaderContainer>
        <h2>Dashboard</h2>
      </HeaderContainer>
      <ContentContainer>
        {_.isEmpty(userContents) ? (
          <MessageBox>
            Looks like you haven't added anything to learn. Click on the Courses
            tab, create a course, then add any content that you wish to learn to
            it.
          </MessageBox>
        ) : (
          <Timeline userContents={userContents} />
        )}
      </ContentContainer>
    </MainContainer>
  );
};

const mapStateToProps = ({ courses, userContent }) => {
  return {
    isFetching: courses.isFetching || userContent.isFetching,
    userContents: userContent.items
  };
};

export default connect(mapStateToProps)(Dashboard);
