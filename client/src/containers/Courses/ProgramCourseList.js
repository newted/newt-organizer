import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// Components
import { HeaderContainer } from "../../components/Page/Containers";
import Button from "../../components/Button";
import Card from "../../components/Card";
// Styling
import styles from "./ProgramCourseList.module.css";
import { BookIcon } from "../../utils/icons";

class ProgramCourseList extends Component {
  static propTypes = {
    programId: PropTypes.string.isRequired,
    programCourses: PropTypes.object.isRequired,
    dispatch: PropTypes.func
  };

  renderCards() {
    const { programId, programCourses } = this.props;

    return _.map(programCourses, ({ _id, name }) => {
      return (
        <Card
          path={`/programs/${programId}/courses/${_id}`}
          title={name}
          icon={BookIcon}
          additionalClass={styles.cardColor}
          key={_id}
        />
      );
    });
  }

  renderNoCourses() {
    return (
      <div className={styles.message}>
        This program doesn't have any courses (yet). To add a course, click on{" "}
        the <span className={styles.addCourse}>Add Courses</span> button.
      </div>
    );
  }

  render() {
    const { programId, programCourses } = this.props;

    return (
      <div className={styles.courseContainer}>
        <HeaderContainer className={styles.subHeaderContainer}>
          <h3>Courses</h3>
          <Link to={{ pathname: `/programs/${programId}/courses/add` }}>
            <Button category="success">Add Course</Button>
          </Link>
        </HeaderContainer>
        <div className={styles.cardContainer}>
          {!_.isEmpty(programCourses)
            ? this.renderCards()
            : this.renderNoCourses()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ programs, courses }, { programId }) {
  const program = programs.items[programId];
  const courseList = program ? program.courses : null;

  const programCourses = {};

  if (courseList) {
    courseList.map(courseId =>
      courses.items[courseId]
        ? (programCourses[courseId] = courses.items[courseId])
        : null
    );
  }

  return {
    programId,
    programCourses
  };
}

export default connect(mapStateToProps)(ProgramCourseList);
