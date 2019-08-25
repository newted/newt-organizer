import React, { Component } from "react";
import _ from "lodash";
// Components
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
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
      <div className={styles.quizBody}>
        <p
          className={styles.light}
        >{`Question ${currentQuestion}/${numQuestions}`}</p>
        <h4 className={styles.question}>{question}</h4>
        <ol type="A" className={styles.optionsGroup}>
          {options.map(option => (
            <li key={option._id} className={styles.option}>
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
              onClick={this.decrementCurrentQuestion}
            >
              Back
            </Button>
          )}
          {/* Don't show next button if it's the last question */}
          {currentQuestion !== numQuestions && (
            <Button
              variant="primary"
              className={styles.actionButton}
              onClick={this.incrementCurrentQuestion}
            >
              Next
            </Button>
          )}
        </div>
      </div>
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
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              {/* Show Finish button when on the last question */}
              {currentQuestion === numQuestions && (
                <Button
                  variant="primary"
                  onClick={() => alert("working on this!")}
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
