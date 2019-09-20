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
      showReview,
      ...rest
    } = this.props;

    switch (currentSection) {
      case "intro":
        return (
          <QuizIntro
            numQuestions={numQuestions}
            onBeginClick={onClickBegin}
            showReview={showReview}
          />
        );
      case "questions":
        const questionInfo = questions[currentQuestion - 1];
        return (
          <QuizQuestion
            currentQuestion={currentQuestion}
            numQuestions={numQuestions}
            questionInfo={questionInfo}
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
      isQuizComplete,
      showReview,
      onClickFinish
    } = this.props;

    return (
      <>
        <Modal.Header>
          <Modal.Title>{quizName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.renderQuizBody(currentSection)}</Modal.Body>
        <Modal.Footer>
          {!(currentSection === "outro" && !showReview) && (
            <Button
              variant="secondary"
              onClick={onCloseModal}
              style={{ width: "100px" }}
            >
              Close
            </Button>
          )}
          {/* Show Finish button in outro section, unless it's in review */}
          {currentSection === "outro" && !showReview && (
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
