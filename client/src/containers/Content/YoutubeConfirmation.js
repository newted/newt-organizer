import React from "react";
import DefaultContentForm from "./DefaultContentForm";
// Styling
import styles from "./AddContent.module.css";

const YoutubeConfirmation = ({ contentInfo, onFormSubmit }) => {
  const initialValues = {
    name: contentInfo.videoData.snippet.title,
    description: contentInfo.videoData.snippet.description,
    dateDue: ""
  };
  const options = {
    hasKnowledgeTracking: contentInfo.hasKnowledgeTracking,
    hasQuiz: contentInfo.hasQuiz
  };

  return (
    <>
      <div className={styles.youtubeImgPreview}>
        <img
          src={contentInfo.videoData.snippet.thumbnails.maxres.url}
          height={contentInfo.videoData.snippet.thumbnails.medium.height}
          width={contentInfo.videoData.snippet.thumbnails.medium.width}
          alt={contentInfo.videoData.snippet.title}
        />
      </div>
      <DefaultContentForm
        type="create"
        category="youtube"
        initialValues={initialValues}
        onFormSubmit={onFormSubmit}
        numTextBoxRows={5}
        options={options}
      />
    </>
  );
};

export default YoutubeConfirmation;
