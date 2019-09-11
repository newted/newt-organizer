import React from "react";
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
// Styles
import styles from "./AddContent.module.css";

const AddContent = () => (
  <MainContainer>
    <HeaderContainer>
      <h4>Add Content</h4>
    </HeaderContainer>
    <ContentContainer className={styles.contentForms}>
      <TabContainer id="add-content-tabs" defaultActiveKey="default">
        <Row style={{ minHeight: "500px" }}>
          <Col lg={2} md={3}>
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
          <Col lg={10} md={9}>
            <TabContent>
              <TabPane eventKey="default">Default form...</TabPane>
              <TabPane eventKey="youtube">YouTube form...</TabPane>
            </TabContent>
          </Col>
        </Row>
      </TabContainer>
    </ContentContainer>
  </MainContainer>
);

export default AddContent;
