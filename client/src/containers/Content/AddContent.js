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
import DefaultContentForm from "./DefaultContentForm";
// Styles
import styles from "./AddContent.module.css";

const AddContent = () => (
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
                <DefaultContentForm />
              </TabPane>
              <TabPane eventKey="youtube">YouTube form...</TabPane>
            </TabContent>
          </Col>
        </Row>
      </TabContainer>
    </ContentContainer>
  </MainContainer>
);

export default AddContent;
