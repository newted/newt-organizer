import React from "react";
import ContentForm from "./ContentForm";
// Styling
import styles from "./AddContent.module.css";

const YoutubeConfirmation = ({ videoContentInfo, onFormSubmit }) => {
  const initialValues = {
    name: videoContentInfo.videoInfo.name,
    description: videoContentInfo.videoInfo.description,
    dateDue: ""
  };
  const options = {
    hasKnowledgeTracking: videoContentInfo.hasKnowledgeTracking,
    hasQuiz: videoContentInfo.hasQuiz
  };

  return (
    <>
      <div className={styles.youtubeImgPreview}>
        <img
          src={videoContentInfo.videoInfo.thumbnails.maxres.url}
          height={videoContentInfo.videoInfo.thumbnails.medium.height}
          width={videoContentInfo.videoInfo.thumbnails.medium.width}
          alt={videoContentInfo.videoInfo.title}
        />
      </div>
      <ContentForm
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
