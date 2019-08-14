import React from "react";
// Components
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
// Styles
import { FiChevronDown } from "react-icons/fi";
import styles from "./Categories.module.css";

const Categories = () => (
  <Accordion defaultActiveKey="0">
    <Card>
      <Accordion.Toggle
        as={Card.Header}
        className={styles.subject}
        eventKey="0"
      >
        <p>Computer Science</p>
        <FiChevronDown />
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0">
        <Card.Body>
          <div>History of Computer Science</div>
          <div>Module 2</div>
          <div>Module 3</div>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
    <Card></Card>
  </Accordion>
);

export default Categories;
