import React from "react";
// Components
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
// Styling
import styles from "./QuizModal.module.css";

const QuizBody = ({
  questionData: {
    currentQuestion,
    numQuestions,
    resultObject: {
      question,
      options,
      isChoiceCorrect,
      optionChosen,
      correctAnswer
    }
  },
  onClickOption,
  onClickNext,
  onClickBack,
  showFinishSection
}) => (
  <div className={styles.quizBody}>
    {showFinishSection ? (
      <QuizFinishSection />
    ) : (
      <>
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
      </>
    )}
  </div>
);

const QuizFinishSection = () => (
  <div className={styles.finishSection}>
    <h4>Thanks for the taking the quiz!</h4>
    <p style={{ marginBottom: "0.75rem" }}>
      Usually at this point we'll ask you to schedule another quiz. The time
      interval between quizzes as well as the questions asked in the next one
      will be based on how you did on this one. This process , called spaced
      repetition, will solidy what you're learning.
    </p>
    <p style={{ marginBottom: "1.5rem" }}>
      We're working on this. Until then, enjoy this picture of two adorable
      puppies:
    </p>
    <Image src="https://placedog.net/400/225?id=8" rounded />
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

export default QuizBody;
