import React, { Component } from "react";
import _ from "lodash";
// Components
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import QuizBody from "./QuizBody";
// Styling
import styles from "./QuizModal.module.css";

class QuizModal extends Component {
  state = {
    show: this.props.show,
    quiz: null,
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

  // Function to increment which question user is on by 1 (0 indicates Intro
  // Message)
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

  // First thing user sees (currentQuestion = 0). Message + button to begin quiz.
  renderIntroMessage() {
    return (
      <div className={styles.quizBody}>
        <p>Whenever you're ready, click the button to begin the quiz.</p>
        <p
          className={styles.light}
        >{`Total Questions: ${this.state.numQuestions}`}</p>
        <Button
          variant="primary"
          className={styles.beginButton}
          onClick={this.incrementCurrentQuestion}
        >
          Begin Quiz
        </Button>
      </div>
    );
  }

  // UI for each question
  renderQuestion(currentQuestion) {
    const {
      quiz: { results },
      numQuestions
    } = this.state;
    const { question, options } = results[currentQuestion - 1];

    return (
      <QuizBody
        currentQuestion={currentQuestion}
        numQuestions={numQuestions}
        question={question}
        options={options}
        onClickOption={this.handleOptionClick}
        onClickNext={this.incrementCurrentQuestion}
        onClickBack={this.decrementCurrentQuestion}
      />
    );
  }

  render() {
    const { show, handleCloseModal, quizName } = this.props;
    const { currentQuestion, numQuestions } = this.state;

    return (
      <Modal show={show} onHide={handleCloseModal} size="lg">
        {this.state.quiz ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{quizName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {currentQuestion === 0
                ? this.renderIntroMessage()
                : this.renderQuestion(currentQuestion)}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleCloseModal}
                style={{ width: "100px" }}
              >
                Close
              </Button>
              {/* Show Finish button when on the last question */}
              {currentQuestion === numQuestions && (
                <Button
                  variant="primary"
                  onClick={() => alert("working on this!")}
                  style={{ width: "100px" }}
                >
                  Finish
                </Button>
              )}
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>Generating quiz...</Modal.Body>
          </>
        )}
      </Modal>
    );
  }
}

export default QuizModal;
