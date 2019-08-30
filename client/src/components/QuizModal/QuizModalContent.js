import React, { Component } from "react";
// Components
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import QuizIntro from "./QuizIntro";
import QuizQuestion from "./QuizQuestion";
import QuizOutro from "./QuizOutro";
// Styling
import styles from "./QuizBody.module.css";

class QuizModalContent extends Component {
  renderQuizBody(currentSection) {
    const {
      questions,
      currentQuestion,
      numQuestions,
      onClickBegin,
      isQuizComplete,
      ...rest
    } = this.props;

    switch (currentSection) {
      case "intro":
        return (
          <QuizIntro
            numQuestions={numQuestions}
            onBeginClick={onClickBegin}
            showReview={isQuizComplete}
          />
        );
      case "questions":
        const questionInfo = questions[currentQuestion - 1];
        return (
          <QuizQuestion
            currentQuestion={currentQuestion}
            numQuestions={numQuestions}
            questionInfo={questionInfo}
            showReview={isQuizComplete}
            {...rest}
          />
        );
      case "outro":
        return <QuizOutro />;
      default:
        return (
          <QuizIntro numQuestions={numQuestions} onBeginClick={onClickBegin} />
        );
    }
  }

  render() {
    const {
      quizName,
      onCloseModal,
      currentSection,
      currentQuestion,
      numQuestions,
      isQuizComplete,
      onClickFinish
    } = this.props;

    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>{quizName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.renderQuizBody(currentSection)}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={onCloseModal}
            style={{ width: "100px" }}
          >
            Close
          </Button>
          {/* Show Finish button in footer when on the last question (don't
              show when in outro section or if quiz is complete) */}
          {currentQuestion === numQuestions &&
            currentSection !== "outro" &&
            !isQuizComplete && (
              <Button
                variant="primary"
                className={
                  isQuizComplete
                    ? styles.finishButton
                    : `${styles.finishButton} ${styles.disabledButton}`
                }
                onClick={onClickFinish}
                disabled={!isQuizComplete}
              >
                Finish
              </Button>
            )}
        </Modal.Footer>
      </>
    );
  }
}

export default QuizModalContent;
