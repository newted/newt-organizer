import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
// Components
import {
  MainContainer,
  HeaderContainer
} from "../../components/PageContainers";
import Loader from "../../components/Loader";

const NewCoursePage = ({ match }) => {
  const [currentCourse, setCurrentCourse] = useState({});

  // Get courseId from URL
  const { courseId } = match.params;
  // Get courses data from global state
  const courses = useSelector(state => state.newCourses);

  useEffect(() => {
    // Filter out course which matches page's courseId
    const [course] = _.filter(courses.items, course => course._id === courseId);
    // Set state
    setCurrentCourse(course);
  }, [courses.items, courseId]);

  // If fetching or current course hasn't been set yet, show Loader
  if (courses.isFetching || _.isEmpty(currentCourse)) {
    return <Loader />;
  }

  return (
    <MainContainer>
      <HeaderContainer>
        <h2>{currentCourse.name}</h2>
      </HeaderContainer>
    </MainContainer>
  );
};

export default NewCoursePage;
