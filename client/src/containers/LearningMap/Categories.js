import React from "react";
// Components
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
// Styles
import { FiChevronDown } from "react-icons/fi";
import styles from "./Categories.module.css";

const Categories = ({ knowledgeMap }) => {
  // Get array of subjects, which are the fields of the knowledge map object
  const subjects = Object.keys(knowledgeMap);

  return (
    <Accordion defaultActiveKey="0">
      {/* Map over each subject and create an accordion nav menu, with the
          modules showing in the collapsed state. (Modules are fields of subject
          object) */}
      {subjects.map((subject, index) => {
        const modules = Object.keys(knowledgeMap[subject]);

        return (
          <Card key={subject}>
            <Accordion.Toggle
              as={Card.Header}
              className={styles.subject}
              eventKey={String(index)}
            >
              <p>{subject}</p>
              <FiChevronDown />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={String(index)}>
              <Card.Body>
                {modules.map(module => (
                  <p key={module} className={styles.module}>
                    {module}
                  </p>
                ))}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        );
      })}
      {/* If there is only 1 subject, add an empty card because the accordion
          component messes up UI if there's only 1 */}
      {subjects.length === 1 && <Card></Card>}
    </Accordion>
  );
};

export default Categories;
