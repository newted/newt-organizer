/* This is the page that's rendered when you click on Courses on the Sidebar */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import { withToastManager } from "react-toast-notifications";
// API
import { fetchAllCourses, resolveCourses } from "../../actions/courses";
// Components
import Card from "../../components/Card";
import Loader from "../../components/Loader";
// Helpers
import { displayErrorNotification } from "../../components/CustomToast/errorNotification";
// Styling
import styles from "./CourseList.module.css";
import { BookIcon } from "../../utils/icons";

class CourseList extends Component {
  static propTypes = {
    programs: PropTypes.shape({
      isFetching: PropTypes.bool,
      items: PropTypes.object
    }),
    // Connect props
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  };

  // Variable to keep track of notification ids
  toastId = null;

  componentDidUpdate() {
    const { toastManager, resolveCourses } = this.props;
    const { error } = this.props.courses;

    // Error handling: add error toast notification if there's any error with
    // data requests.
    if (error.message && error.requestType && error.source === "courses") {
      switch (error.requestType) {
        case "fetch":
          const callback = id => (this.toastId = id);
          // Display error notification
          displayErrorNotification(
            toastManager,
            "fetch",
            "course",
            error.message,
            this.onRetry,
            callback
          );
          break;
        default:
          return;
      }
      resolveCourses();
    }
  }

  onRetry = () => {
    const { programs, fetchAllCourses, toastManager } = this.props;

    // A request is made to fetch all courses. Then the toast is removed so that
    // it no longer displays on the screen.
    fetchAllCourses(Object.keys(programs.items));
    toastManager.remove(this.toastId);
  };

  renderCards(programId, courseList) {
    const { courses } = this.props;

    return _.map(courseList, courseId => {
      return (
        <Card
          path={`/programs/${programId}/courses/${courseId}`}
          title={courses.items[courseId].name}
          icon={BookIcon}
          additionalClass={styles.cardColor}
          key={courseId}
        />
      );
    });
  }

  renderNoContent() {
    const programLink = (
      <Link to="/programs" className={styles.link}>
        Programs
      </Link>
    );

    if (_.isEmpty(this.props.programs.items)) {
      return (
        <div className={styles.message}>
          You aren't in any programs. Go to the {programLink} page from the
          sidebar to create a Program.
        </div>
      );
    }

    return (
      <div className={styles.message}>
        There are no courses to display. Add a course in any of your{" "}
        {programLink} to see your courses listed here.
      </div>
    );
  }

  renderCourseSections() {
    const { programs } = this.props;

    return _.map(programs.items, ({ _id, name, institution, courses }) => {
      const courseList = courses;

      if (courses.length > 0) {
        return (
          <div className={styles.courseSection} key={_id}>
            <div className={styles.headings}>
              <Link to={`/programs/${_id}`} className={styles.header}>
                {name}
              </Link>
              <div className={styles.institution}>{institution}</div>
            </div>
            <div className={styles.cardContainer}>
              {this.renderCards(_id, courseList)}
            </div>
          </div>
        );
      }
    });
  }

  render() {
    const { programs, courses } = this.props;

    // If either programs or courses is fetching and if either of the two is
    // empty, display Loader UI.
    if (
      (programs.isFetching && _.isEmpty(programs.items)) ||
      (courses.isFetching && _.isEmpty(courses.items))
    ) {
      return <Loader />;
    }

    return (
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <h2>Your Courses</h2>
        </div>
        <div className={styles.coursesContainer}>
          {!_.isEmpty(this.props.courses.items)
            ? this.renderCourseSections()
            : this.renderNoContent()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ programs, courses }) {
  return {
    programs,
    courses
  };
}

const mapDispatchToProps = {
  fetchAllCourses,
  resolveCourses
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(CourseList));
