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
import DefaultContentForm from "./DefaultContentForm";
import YoutubeContentForm from "./YoutubeContentForm";
import YoutubeConfirmation from "./YoutubeConfirmation";
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

  return (
    <MainContainer>
      <HeaderContainer>
        <h4>Add Content</h4>
      </HeaderContainer>
      <ContentContainer className={styles.contentForms}>
        <TabContainer id="add-content-tabs" defaultActiveKey="default">
          <Row>
            <Col md={3} style={{ marginTop: "1rem" }}>
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
              </Nav>
            </Col>
            <Col md={9} className={styles.tabPane}>
              <TabContent>
                <TabPane eventKey="default">
                  <DefaultContentForm
                    type="create"
                    onFormSubmit={handleDefaultFormSubmit}
                  />
                </TabPane>
                <TabPane eventKey="youtube">
                  {onConfirmationPage ? (
                    <YoutubeConfirmation contentInfo={videoContentInfo} />
                  ) : (
                    <YoutubeContentForm onNext={handleGoToConfirmationPage} />
                  )}
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
