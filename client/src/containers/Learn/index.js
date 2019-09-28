import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";
// Components
import {
  MainContainer,
  HeaderContainer,
  ContentContainer
} from "../../components/PageContainers";
import Loader from "../../components/Loader";
import MessageBox from "../../components/MessageBox";
import LearnContentCard from "./LearnContentCard";
import ContentFlow from "../Content/ContentFlow";
import EditContentModal from "../Content/EditContentModal";
import DeleteItemModal from "../../components/Modal/DeleteItemModal";
import QuizModal from "../../components/QuizModal";
// API
import {
  updateUserContent,
  deleteUserContent,
  addQuizToUserContent
} from "../../actions/userContent";
import {
  createPersonalQuiz,
  fetchQuiz,
  completeQuiz
} from "../../actions/quizzes";
import { updateLearningMap } from "../../actions/learningMap";
// Helpers
import { statusDueDateSort } from "../../utils/containerHelpers";
// Styling
import styles from "./Learn.module.css";

const LearnPage = ({
  isFetching,
  userContents,
  userQuizzes,
  learningMapId,
  updateUserContent,
  deleteUserContent,
  createPersonalQuiz,
  addQuizToUserContent,
  fetchQuiz,
  completeQuiz,
  updateLearningMap,
  match,
  history
}) => {
  const [currentContent, setCurrentContent] = useState(null);
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

  // Use the userContentId from the url to get and set the currentContent from
  // the userContents array. If there's no id in the url, set it to the first
  // item in the array
  useEffect(() => {
    if (!_.isEmpty(userContents)) {
      if (userContentId) {
        const filteredContent = _.filter(
          userContents,
          content => content._id === userContentId
        );

        setCurrentContent(filteredContent[0]);
      } else {
        setCurrentContent(userContents[0]);
      }
    }
  }, [userContentId, currentContent, userContents]);

  // Function to handle updating content when edit form is submitted
  const handleEditFormSubmit = values => {
    updateUserContent(currentContent._id, values);
    handleCloseEditModal();
  };

  // Function to handle deleting content
  const handleDeleteContent = () => {
    deleteUserContent(currentContent._id, currentContent.courseId);
    history.push("/learn");
    handleCloseDeleteModal();
  };

  // Function to toggle completion of content
  const toggleContentCompletion = currentCompletionState => {
    updateUserContent(currentContent._id, {
      isComplete: !currentCompletionState
    });
  };

  // Handler function for when the 'Take the quiz' button is clicked
  const handleTakeQuiz = userContent => {
    // Open quiz modal
    handleShowQuizModal();

    if (_.isEmpty(userContent.quizInfo)) {
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
      if (userQuizzes[userContent.quizInfo[0].quizId]) {
        setCurrentQuiz(userQuizzes[userContent.quizInfo[0].quizId]);
      } else {
        // Fetch personal quiz using id
        fetchQuiz(userContent.quizInfo[0].quizId).then(quiz =>
          setCurrentQuiz(quiz)
        );
      }
    }
  };

  // Handler function to submit request to update quiz once it's complete
  const handleCompleteQuiz = quiz => {
    handleCloseQuizModal();
    // Set completed date
    quiz.dateCompleted = Date.now();

    // Update quiz results
    completeQuiz(quiz).then(updatedQuiz => {
      // Add completed data to user content's quiz info
      currentContent.quizInfo[0].dateCompleted = updatedQuiz.dateCompleted;
      // Update user content with new quiz info
      updateUserContent(userContentId, { quizInfo: currentContent.quizInfo });

      // Update learning map
      let quizTopicsIds = [];
      // Get all the topic ids from each question and add it to the array
      _.each(updatedQuiz.results, ({ topics }) => {
        quizTopicsIds = _.concat(quizTopicsIds, topics);
      });
      // Remove duplicate topic ids
      quizTopicsIds = _.uniq(quizTopicsIds);
      // Combine primary and secondary topics into single array
      const allTopics = currentContent.contentInfo.primaryTopics.concat(
        currentContent.contentInfo.secondaryTopics
      );

      // Filter out topics that aren't part of the quiz (not in topicIds array)
      const quizTopics = _.filter(
        allTopics,
        ({ topicId }) => _.indexOf(quizTopicsIds, topicId) !== -1
      );

      const data = {
        knowledgeSubject: currentContent.knowledgeSubject,
        knowledgeModule: currentContent.knowledgeModule,
        topics: quizTopics,
        contentHistory: {
          name: currentContent.contentInfo.name,
          contentId: currentContent.contentInfo.contentId
        }
      };

      // Send request to update learning map
      updateLearningMap(learningMapId, data);
    });
  };

  // Function that returns whether a quiz has been completed or not, so the
  // right quiz page flow (questions or results) can be shown
  const isQuizComplete = () => {
    // If the quizInfo array is empty (no quizzes), return false. Otherwise
    // check if the dateCompleted field is filled. If there's a date, return
    // true, otherwise false
    if (_.isEmpty(currentContent.quizInfo)) {
      return false;
    }
    return !_.isEmpty(currentContent.quizInfo[0].dateCompleted);
  };

  if (isFetching) return <Loader />;

  // Message indicating to content exists and how to add some
  const renderNoContent = () => (
    <MessageBox>
      Looks like you haven't added anything to learn. Click on the Courses tab,
      create a course, then add any content that you wish to learn to it.
    </MessageBox>
  );

  return (
    <MainContainer>
      <HeaderContainer>
        <h2>Learn</h2>
      </HeaderContainer>
      <ContentContainer>
        {/* If the content data array is empty or the currentContent state
            hasn't been set yet, render no content. */}
        {!currentContent ? (
          renderNoContent()
        ) : (
          <>
            <div className={styles.contentList}>
              {_.map(userContents, content => (
                <LearnContentCard
                  key={content._id}
                  userContent={content}
                  isActive={content._id === currentContent._id}
                />
              ))}
            </div>
            <div className={styles.contentFlow}>
              <ContentFlow
                content={currentContent}
                showEditModal={handleShowEditModal}
                showDeleteModal={handleShowDeleteModal}
                onTakeQuiz={handleTakeQuiz}
                onToggleContent={toggleContentCompletion}
              />
            </div>
          </>
        )}
      </ContentContainer>
      {currentContent && (
        <>
          <EditContentModal
            show={showEditModal}
            onHide={handleCloseEditModal}
            content={currentContent}
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
            quizName={`Quiz for ${currentContent.name}`}
            quiz={currentQuiz}
            showReview={isQuizComplete()}
            onComplete={handleCompleteQuiz}
          />
        </>
      )}
    </MainContainer>
  );
};

const mapStateToProps = ({ courses, userContent, quizzes, learningMap }) => {
  let userContentArray = _.values(userContent.items);

  // Add course name for each user content
  userContentArray.forEach(content => {
    content.courseName = courses.items[content.courseId].name;
  });

  // Sort by completion status and date
  statusDueDateSort(userContentArray);

  return {
    isFetching: courses.isFetching || userContent.isFetching,
    userContents: userContentArray,
    userQuizzes: quizzes.items,
    learningMapId: learningMap.items._id
  };
};

const mapDispatchToProps = {
  updateUserContent,
  deleteUserContent,
  createPersonalQuiz,
  fetchQuiz,
  addQuizToUserContent,
  completeQuiz,
  updateLearningMap
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearnPage);
