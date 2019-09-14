import React from "react";
import _ from "lodash";
import MessageBox from "../../components/MessageBox";
import ContentCard from "../Content/ContentCard";

const CourseContent = ({ courseContent }) => {
  if (_.isEmpty(courseContent)) {
    return (
      <MessageBox>
        There is no content to display. To add content, click the{" "}
        <span style={{ color: "#33ce57", fontWeight: "600" }}>Add Content</span>{" "}
        button.
      </MessageBox>
    );
  }

  return _.map(courseContent, content => (
    <ContentCard key={content._id} content={content} />
  ));
};

export default CourseContent;
