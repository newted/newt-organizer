import React from "react";
// Components
import Button from "react-bootstrap/Button";
// Styling
import styles from "./QuizModal.module.css";

const QuizBody = ({
  currentQuestion,
  numQuestions,
  question,
  options,
  onClickOption,
  onClickNext,
  onClickBack
}) => (
  <div className={styles.quizBody}>
    <p
      className={styles.light}
    >{`Question ${currentQuestion}/${numQuestions}`}</p>
    <h4 className={styles.question}>{question}</h4>
    <ol type="A" className={styles.optionsGroup}>
      {options.map(option => (
        <li
          key={option._id}
          className={styles.option}
          onClick={e => onClickOption(e)}
        >
          {option.option}
        </li>
      ))}
    </ol>
    <div className={styles.actionButtonGroup}>
      {/* Don't show back button if it's the first question */}
      {currentQuestion !== 1 && (
        <Button
          variant="secondary"
          className={styles.actionButton}
          onClick={() => onClickBack()}
        >
          Back
        </Button>
      )}
      {/* Don't show next button if it's the last question */}
      {currentQuestion !== numQuestions && (
        <Button
          variant="primary"
          className={styles.actionButton}
          onClick={() => onClickNext()}
        >
          Next
        </Button>
      )}
    </div>
  </div>
);

export default QuizBody;
