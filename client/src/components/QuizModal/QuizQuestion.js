import React from "react";
// Components
import Button from "react-bootstrap/Button";
// Styling
import styles from "./QuizBody.module.css";

const QuizQuestion = ({
  currentQuestion,
  numQuestions,
  resultObject: {
    question,
    options,
    isChoiceCorrect,
    optionChosen,
    correctAnswer
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
      {/* Don't show next button if it's the last question */}
      {currentQuestion !== numQuestions && (
        <Button
          variant="primary"
          className={styles.actionButton}
          onClick={onClickNext}
        >
          Next
        </Button>
      )}
    </div>
  </div>
);

// Function to set class based on whether the option selected was correct or wrong
const setOptionClass = (
  option,
  optionChosen,
  correctAnswer,
  isChoiceCorrect
) => {
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
      // If a wrong option is selected, this will display the correct answer
      // .correctOption = CSS for correct option selected
      // .correctAnswer = CSS for option that is correct if option selected by user
      //                  was wrong.
    } else if (option === correctAnswer) {
      return [styles.option, styles.correctAnswer].join(" ");
    } else {
      return [styles.option, styles.disabledOption].join(" ");
    }
  }

  // If not any of the above, return the default option class
  return styles.option;
};

export default QuizQuestion;
