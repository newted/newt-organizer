import React, { Component } from "react";
import _ from "lodash";
// Components
import Modal from "react-bootstrap/Modal";
import QuizModalContent from "./QuizModalContent";
// Styling
import styles from "./QuizBody.module.css";

class QuizModal extends Component {
  state = {
    show: this.props.show,
    quiz: null,
    currentSection: "intro",
    numQuestions: 0,
    currentQuestion: 0
  };

  componentDidUpdate() {
    const { quiz } = this.props;

    // Add quiz and number of questions to state
    if (_.isEmpty(this.state.quiz) && !_.isEmpty(quiz)) {
      this.setState({ quiz, numQuestions: quiz.results.length });
    }
  }

  // Function to handle beginning the quiz: move from intro section to questions
  handleBeginClick = () => {
    this.setState({ currentSection: "questions", currentQuestion: 1 });
  };

  // Functions to increment and decrement which question user is on by 1 (0
  // indicates Intro Message)
  incrementCurrentQuestion = () => {
    this.setState(state => ({ currentQuestion: state.currentQuestion + 1 }));
  };

  decrementCurrentQuestion = () => {
    this.setState(state => ({ currentQuestion: state.currentQuestion - 1 }));
  };

  // Function to update quiz results - record option picked and check if it's right.
  handleOptionClick = e => {
    e.preventDefault();

    const {
      quiz: { results },
      currentQuestion
    } = this.state;
    // Create new results array
    let newResults = [...results];

    // Get value of the text of the option selected
    const optionChosen = e.target.innerText;
    // Check if it's the same as the correct answer
    const isChoiceCorrect =
      optionChosen === newResults[currentQuestion - 1].correctAnswer;

    // Add the two data points to the result object
    newResults[currentQuestion - 1].optionChosen = optionChosen;
    newResults[currentQuestion - 1].isChoiceCorrect = isChoiceCorrect;

    // Update quiz with the new results
    this.setState(state => ({
      quiz: {
        ...state.quiz,
        results: newResults
      }
    }));
  };

  // Function to handle clicking the Finish button - send user to Finish section
  handleFinishClick = () => {
    this.setState({ currentSection: "outro" });
  };

  // Function to check if the quiz has been completed (all the questions
  // answered) - used to disable Finish button until complete
  isQuizComplete = results => {
    const { numQuestions } = this.state;

    // Returns only questions that have been answered (by checking if the object
    // has an `optionChosen` field)
    const isComplete = results.filter(result => _.has(result, "optionChosen"));

    // Checks if the filtered list is the same as the number of questions and
    // returns boolean
    return isComplete.length === numQuestions;
  };

  render() {
    const {
      quiz: { results },
      show,
      handleCloseModal,
      quizName
    } = this.props;
    const { currentSection, currentQuestion, numQuestions } = this.state;

    return (
      <Modal show={show} onHide={handleCloseModal} size="lg" backdrop="static">
        {this.state.quiz ? (
          <QuizModalContent
            quizName={quizName}
            questions={results}
            onCloseModal={handleCloseModal}
            currentSection={currentSection}
            currentQuestion={currentQuestion}
            numQuestions={numQuestions}
            isQuizComplete={this.isQuizComplete(results)}
            onClickBegin={this.handleBeginClick}
            onClickFinish={this.handleFinishClick}
            onClickOption={this.handleOptionClick}
            onClickNext={this.incrementCurrentQuestion}
            onClickBack={this.decrementCurrentQuestion}
          />
        ) : (
          <QuizLoading />
        )}
      </Modal>
    );
  }
}

const QuizLoading = () => (
  <>
    <Modal.Header closeButton></Modal.Header>
    <Modal.Body>
      <div className={styles.quizBody}>Generating quiz...</div>
    </Modal.Body>
  </>
);

export default QuizModal;
