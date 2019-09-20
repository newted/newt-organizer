import React from "react";
// Components
import Button from "react-bootstrap/Button";
// Styling
import styles from "./QuizBody.module.css";
// Helpers
import { setOptionClass } from "./quizHelpers";

const QuizQuestion = ({
  currentQuestion,
  numQuestions,
  questionInfo: {
    question,
    options,
    isChoiceCorrect,
    optionChosen,
    correctAnswer
  },
  isQuizComplete,
  onClickOption,
  onClickNext,
  onClickSummary,
  onClickBack
}) => (
  <div className={styles.quizBody}>
    <p
      className={styles.light}
    >{`Question ${currentQuestion}/${numQuestions}`}</p>
    <h4 className={styles.question}>{question}</h4>
    <ol type="A" className={styles.optionsGroup}>
      {options.map(option => (
        <div key={option._id} className={styles.listGroup}>
          <li
            // If the option chosen is the same as the current option, set UI
            // based on whether the option chosen is correct or wrong
            className={setOptionClass(
              option.option,
              optionChosen,
              correctAnswer,
              isChoiceCorrect
            )}
            onClick={e => (optionChosen ? null : onClickOption(e))}
          >
            {option.option}
          </li>
          {/* Display the answer explanation if an option has been chosen and
        an explanation exists */}
          {optionChosen && option.explanation && (
            <p className={styles.explanation}>{option.explanation}</p>
          )}
        </div>
      ))}
    </ol>
    <div className={styles.actionButtonGroup}>
      {/* Don't show back button if it's the first question */}
      {currentQuestion !== 1 && (
        <Button
          variant="secondary"
          className={styles.actionButton}
          onClick={onClickBack}
        >
          Back
        </Button>
      )}
      {/* If it's the last question, render Show Summary button, otherwise
          Next button */}
      {currentQuestion !== numQuestions ? (
        <Button
          variant="primary"
          className={styles.actionButton}
          onClick={onClickNext}
        >
          Next
        </Button>
      ) : (
        <Button
          variant="primary"
          className={styles.actionButton}
          onClick={onClickSummary}
          disabled={!isQuizComplete}
        >
          Show Summary
        </Button>
      )}
    </div>
  </div>
);

export default QuizQuestion;
