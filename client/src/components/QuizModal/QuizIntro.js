import React from "react";
// Components
import Button from "react-bootstrap/Button";
// Styling
import styles from "./QuizBody.module.css";

const defaultMessage =
  "Whenever you're ready, click the button to begin the quiz.";

const QuizIntro = ({
  message = defaultMessage,
  numQuestions,
  onBeginClick
}) => (
  <div className={styles.quizBody}>
    <p>{message}</p>
    <p className={styles.light}>{`Total Questions: ${numQuestions}`}</p>
    <Button
      variant="primary"
      className={styles.beginButton}
      onClick={onBeginClick}
    >
      Begin Quiz
    </Button>
  </div>
);

export default QuizIntro;
