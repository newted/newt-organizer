import React, { useState } from "react";
import { connect } from "react-redux";
// Components
import {
  MainContainer,
  HeaderContainer,
  ContentContainer
} from "../../components/PageContainers";
import { CustomNavItem, CustomNavLink } from "../../components/CustomNav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import TabContent from "react-bootstrap/TabContent";
import TabPane from "react-bootstrap/TabPane";
import TabContainer from "react-bootstrap/TabContainer";
import ContentForm from "./ContentForm";
import YoutubeContentForm from "./YoutubeContentForm";
import YoutubeConfirmation from "./YoutubeConfirmation";
import BookContentForm from "./BookContentForm";
// API
import {
  createUserContent,
  getYoutubeVideoInfo
} from "../../actions/userContent";
// Styles
import styles from "./AddContent.module.css";

const AddContent = ({ location, history, createUserContent }) => {
  const [onConfirmationPage, setOnConfirmationPage] = useState(false);
  const [videoContentInfo, setVideoContentInfo] = useState({});

  // Function to handle creating default content
  const handleDefaultFormSubmit = values => {
    const { courseId } = location.state;
    createUserContent(values, courseId);
    history.push(`/courses/${courseId}`);
  };

  const handleGoToConfirmationPage = async values => {
    const videoContent = await getYoutubeVideoInfo(values.url);
    setVideoContentInfo(videoContent);
    setOnConfirmationPage(true);
  };

  const handleYoutubeFormSubmit = values => {
    const { courseId } = location.state;
    // Remove name and description fields from videoInfo (will use form values)
    delete videoContentInfo.videoInfo.name;
    delete videoContentInfo.videoInfo.description;

    const data = { ...values, ...videoContentInfo };
    createUserContent(data, courseId);
    history.push(`/courses/${courseId}`);
  };

  const handleGoToBookSearchResults = async values => {
    const { title, author } = values;
    let url = `/content/add/book-search?title=${title}`;

    // Add author to url if any value was entered
    if (author) {
      url = url + `&author=${author}`;
    }
    // Go to search results page
    history.push(url);
  };

  return (
    <MainContainer>
      <HeaderContainer>
        <h4>Add Content</h4>
      </HeaderContainer>
      <ContentContainer className={styles.contentForms}>
        <TabContainer id="add-content-tabs" defaultActiveKey="default">
          <Row>
            <Col lg={3} style={{ marginTop: "1rem" }}>
              <h5 style={{ color: "#666", marginBottom: "1rem" }}>
                Content Type
              </h5>
              <Nav variant="pills" className="flex-column">
                <Nav.Item as={CustomNavItem}>
                  <Nav.Link as={CustomNavLink} eventKey="default">
                    Default
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as={CustomNavItem}>
                  <Nav.Link as={CustomNavLink} eventKey="youtube">
                    YouTube
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as={CustomNavItem}>
                  <Nav.Link as={CustomNavLink} eventKey="book">
                    Book
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col lg={9} className={styles.tabPane}>
              <TabContent>
                <TabPane eventKey="default">
                  <ContentForm
                    type="create"
                    onFormSubmit={handleDefaultFormSubmit}
                  />
                </TabPane>
                <TabPane eventKey="youtube">
                  {onConfirmationPage ? (
                    <YoutubeConfirmation
                      videoContentInfo={videoContentInfo}
                      onFormSubmit={handleYoutubeFormSubmit}
                    />
                  ) : (
                    <YoutubeContentForm onNext={handleGoToConfirmationPage} />
                  )}
                </TabPane>
                <TabPane eventKey="book">
                  <BookContentForm onSubmit={handleGoToBookSearchResults} />
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </TabContainer>
      </ContentContainer>
    </MainContainer>
  );
};

const mapDispatchToProps = { createUserContent };

export default connect(
  null,
  mapDispatchToProps
)(AddContent);
