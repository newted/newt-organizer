import React from "react";
// Components
import {
  MainContainer,
  ContentContainer
} from "../../components/PageContainers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// Styling
import styles from "./ContentPage.module.css";

const ContentPage = ({ isFetching, content }) => (
  <MainContainer>
    <ContentContainer className={styles.contentContainer}>
      <Row>
        <Col lg={3} md={12} className={styles.contentInfo}>
          Content info...
        </Col>
        <Col lg="auto" md={0}></Col>
        <Col lg md className={styles.content}>
          Content...
        </Col>
      </Row>
    </ContentContainer>
  </MainContainer>
);

export default ContentPage;
