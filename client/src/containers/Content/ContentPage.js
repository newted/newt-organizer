import React, { useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";
// Components
import {
  MainContainer,
  ContentContainer
} from "../../components/PageContainers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Loader from "../../components/Loader";
// API
import { fetchIndividualContent } from "../../actions/userContent";
// Styling
import styles from "./ContentPage.module.css";

const ContentPage = ({
  isFetching,
  content,
  fetchIndividualContent,
  match
}) => {
  const { userContentId } = match.params;

  // Fetch content if it doesn't exist in store
  useEffect(() => {
    if (_.isEmpty(content)) {
      fetchIndividualContent(userContentId);
    }
  }, [content, userContentId, fetchIndividualContent]);

  // If fetching or content object is empty, show loading indicator
  if (isFetching || _.isEmpty(content)) {
    return <Loader />;
  }

  return (
    <MainContainer>
      <ContentContainer className={styles.contentContainer}>
        <Row>
          <Col lg={3} md={12} className={styles.contentInfo}>
            <h4>{content.name}</h4>
          </Col>
          <Col lg="auto" md={0}></Col>
          <Col lg md className={styles.content}>
            <h3>{content.name}</h3>
          </Col>
        </Row>
      </ContentContainer>
    </MainContainer>
  );
};

const mapStateToProps = ({ userContent }, props) => {
  const { userContentId } = props.match.params;
  let currentUserContent = userContent.items[userContentId]
    ? userContent.items[userContentId]
    : null;

  return {
    isFetching: userContent.isFetching,
    content: currentUserContent
  };
};

const mapDispatchToProps = { fetchIndividualContent };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentPage);
