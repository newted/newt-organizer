import React from "react";
// Components
import Button from "react-bootstrap/Button";
// Styling
import styles from "./QuizModal.module.css";

// Function to set class based on whether the option selected was correct or wrong
const setOptionClass = (option, optionChosen, isChoiceCorrect) => {
  // If an option was chosen, check if it's the same as the current option. If
  // it is, return classes based on whether it was correct or not. For the rest
  // of the options (not the one chosen), return the disabled option class
  if (optionChosen) {
    if (option === optionChosen) {
      if (isChoiceCorrect) {
        return [styles.option, styles.correctOption].join(" ");
      } else {
        return [styles.option, styles.wrongOption].join(" ");
      }
    } else {
      return [styles.option, styles.disabledOption].join(" ");
    }
  }

  // If not any of the above, return the default option class
  return styles.option;
};

const QuizBody = ({
  questionData: {
    currentQuestion,
    numQuestions,
    resultObject: { question, options, isChoiceCorrect, optionChosen }
  },
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
          // If the option chosen is the same as the current option, set UI
          // based on whether the option chosen is correct or wrong
          className={setOptionClass(
            option.option,
            optionChosen,
            isChoiceCorrect
          )}
          onClick={e => (optionChosen ? null : onClickOption(e))}
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
