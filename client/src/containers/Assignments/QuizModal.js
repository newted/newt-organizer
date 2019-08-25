import React, { Component } from "react";
import _ from "lodash";
// Components
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

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

  // First thing user sees (currentQuestion = 0). Message + button to begin quiz.
  renderIntroMessage() {
    return (
      <div>
        <p>Whenever you're ready, click the button to begin the quiz.</p>
        <p>{`Total Questions: ${this.state.numQuestions}`}</p>
        <Button variant="primary" onClick={this.incrementCurrentQuestion}>
          Begin
        </Button>
      </div>
    );
  }

  // UI for each question
  renderQuestion(currentQuestion) {
    const { numQuestions } = this.state;

    return <p>{`Question ${currentQuestion}/${numQuestions}`}</p>;
  }

  render() {
    const { show, handleCloseModal, quizName } = this.props;
    const { currentQuestion } = this.state;

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
              <Button
                variant="primary"
                onClick={() => alert("working on this!")}
              >
                Submit
              </Button>
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
