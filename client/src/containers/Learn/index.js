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
// API
import {
  updateUserContent,
  deleteUserContent
} from "../../actions/userContent";
// Helpers
import { statusDueDateSort } from "../../utils/containerHelpers";
// Styling
import styles from "./Learn.module.css";

const LearnPage = ({
  isFetching,
  userContents,
  updateUserContent,
  deleteUserContent,
  match,
  history
}) => {
  const [currentContent, setCurrentContent] = useState(null);
  const [showEditModal, setshowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { userContentId } = match.params;

  // Functions to set edit modal show state to true and false
  const handleShowEditModal = () => setshowEditModal(true);
  const handleCloseEditModal = () => setshowEditModal(false);
  // Functions to set delete modal show state to true and false
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

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
    handleCloseDeleteModal();
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
        </>
      )}
    </MainContainer>
  );
};

const mapStateToProps = ({ courses, userContent }) => {
  let userContentArray = _.values(userContent.items);

  // Add course name for each user content
  userContentArray.forEach(content => {
    content.courseName = courses.items[content.courseId].name;
  });

  // Sort by completion status and date
  statusDueDateSort(userContentArray);

  return {
    isFetching: courses.isFetching || userContent.isFetching,
    userContents: userContentArray
  };
};

const mapDispatchToProps = { updateUserContent, deleteUserContent };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearnPage);
