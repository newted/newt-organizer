import styles from "./QuizBody.module.css";

// Function to set class based on whether the option selected was correct or wrong
export function setOptionClass(
  option,
  optionChosen,
  correctAnswer,
  isChoiceCorrect
) {
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
}
