import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
// Components
import {
  MainContainer,
  HeaderContainer,
  ContentContainer
} from "../../components/PageContainers";
import Loader from "../../components/Loader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// Styling
import styles from "./Learn.module.css";

const LearnPage = ({ isFetching, userContents }) => {
  if (isFetching) return <Loader />;

  return (
    <MainContainer>
      <HeaderContainer>
        <h2>Learn</h2>
      </HeaderContainer>
      <ContentContainer className={styles.contentContainer}>
        <Row>
          <Col lg={4} md={12}>
            <div className={styles.contentList}>
              {_.map(userContents, content => (
                <p key={content._id}>{content.name}</p>
              ))}
            </div>
          </Col>
          <Col lg={8} md={12}>
            {/* <ContentFlow /> */}
          </Col>
        </Row>
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

export default connect(mapStateToProps)(LearnPage);
