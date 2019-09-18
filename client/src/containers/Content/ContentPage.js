import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import moment from "moment";
// Components
import {
  MainContainer,
  ContentContainer
} from "../../components/PageContainers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Loader from "../../components/Loader";
import EditContentModal from "./EditContentModal";
import DeleteItemModal from "../../components/Modal/DeleteItemModal";
import QuizModal from "../../components/QuizModal";
import ContentFlow from "./ContentFlow";
// API
import {
  fetchIndividualContent,
  updateUserContent,
  deleteUserContent,
  addQuizToUserContent
} from "../../actions/userContent";
import { createPersonalQuiz, fetchQuiz } from "../../actions/quizzes";
// Styling
import styles from "./ContentPage.module.css";

const ContentPage = ({
  isFetching,
  content,
  userQuizzes,
  fetchIndividualContent,
  updateUserContent,
  deleteUserContent,
  createPersonalQuiz,
  fetchQuiz,
  addQuizToUserContent,
  match,
  history
}) => {
  const [showEditModal, setshowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState({});
  const { userContentId } = match.params;

  // Functions to set edit modal show state to true and false
  const handleShowEditModal = () => setshowEditModal(true);
  const handleCloseEditModal = () => setshowEditModal(false);
  // Functions to set delete modal show state to true and false
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  // Functions to set quiz modal to ...
  const handleShowQuizModal = () => setShowQuizModal(true);
  const handleCloseQuizModal = () => setShowQuizModal(false);

  // Fetch content if it doesn't exist in store
  useEffect(() => {
    if (_.isEmpty(content)) {
      fetchIndividualContent(userContentId);
    }
  }, [content, userContentId, fetchIndividualContent]);

  // Function to handle updating content when edit form is submitted
  const handleEditFormSubmit = values => {
    updateUserContent(userContentId, values);
    handleCloseEditModal();
  };

  // Function to handle deleting content
  const handleDeleteContent = () => {
    deleteUserContent(userContentId, content.courseId);
    history.push(`/courses/${content.courseId}`);
  };

  // Handler function for when the 'Take the quiz' button is clicked
  const handleTakeQuiz = userContent => {
    // Open quiz modal
    handleShowQuizModal();

    if (_.isEmpty(content.quizInfo)) {
      // Create personal quiz and update assignment
      const data = {
        contentId: userContent.contentInfo.contentId,
        userContentId: userContent._id
      };
      // Dispatch action to create quiz, then update user content to add quiz id
      createPersonalQuiz(data).then(quiz => {
        addQuizToUserContent(userContent._id, {
          quizId: quiz._id
        }).then(() => setCurrentQuiz(quiz));
      });
    } else {
      // If quiz has already been fetched, set to state, otherwise fetch quiz first
      if (userQuizzes[content.quizInfo[0].quizId]) {
        setCurrentQuiz(userQuizzes[content.quizInfo[0].quizId]);
      } else {
        // Fetch personal quiz using id
        fetchQuiz(content.quizInfo[0].quizId).then(quiz =>
          setCurrentQuiz(quiz)
        );
      }
    }
  };

  const renderCreatorInfo = () => {
    const { contentInfo, sourceInfo } = content;

    if (sourceInfo.name === "user") {
      return "You";
    } else {
      if (contentInfo.contentCreator) {
        return (
          <a className={styles.link} href={contentInfo.contentCreator.url}>
            {contentInfo.contentCreator.name}
          </a>
        );
      }

      return sourceInfo.name;
    }
  };

  // If fetching or content object is empty, show loading indicator
  if (isFetching || _.isEmpty(content)) {
    return <Loader />;
  }

  return (
    <MainContainer>
      <ContentContainer className={styles.contentContainer}>
        <Row>
          <Col lg={3} md={12} className={styles.contentInfo}>
            <h4 style={{ marginBottom: "1rem" }}>{content.name}</h4>
            <div className={styles.infoRow}>
              <span className={styles.infoRowField}>
                {content.contentInfo.contentCreator ? "Creator:" : "Source:"}
              </span>
              <span className={styles.infoRowValue}>{renderCreatorInfo()}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoRowField}>Date created:</span>
              <span className={styles.infoRowValue}>
                {moment(content.dateCreated).format("DD MMM")}
              </span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoRowField}>Date due:</span>
              <span className={styles.infoRowValue}>
                {moment(content.dateDue).format("DD MMM")}
              </span>
            </div>
          </Col>
          <Col lg="auto" md={0}></Col>
          <Col lg md>
            <ContentFlow
              content={content}
              showEditModal={handleShowEditModal}
              showDeleteModal={handleShowDeleteModal}
              onTakeQuiz={handleTakeQuiz}
            />
          </Col>
        </Row>
      </ContentContainer>
      <EditContentModal
        show={showEditModal}
        onHide={handleCloseEditModal}
        content={content}
        onFormSubmit={handleEditFormSubmit}
      />
      <DeleteItemModal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        onDelete={handleDeleteContent}
      />
      <QuizModal
        show={showQuizModal}
        handleCloseModal={handleCloseQuizModal}
        quizName={`Quiz for ${content.name}`}
        quiz={currentQuiz}
        onComplete={() => alert("Quiz complete")}
      />
    </MainContainer>
  );
};

const mapStateToProps = ({ userContent, quizzes }, props) => {
  const { userContentId } = props.match.params;
  let currentUserContent = userContent.items[userContentId]
    ? userContent.items[userContentId]
    : null;

  return {
    isFetching: userContent.isFetching,
    content: currentUserContent,
    userQuizzes: quizzes.items
  };
};

const mapDispatchToProps = {
  fetchIndividualContent,
  updateUserContent,
  deleteUserContent,
  createPersonalQuiz,
  fetchQuiz,
  addQuizToUserContent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentPage);
