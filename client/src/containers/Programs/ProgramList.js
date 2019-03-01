import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// API
import { fetchPrograms } from "../../actions/programs";
// Components
import Button from "../../components/Button";
import Card from "../../components/Card";
// Styling
import styles from "./ProgramList.module.css";
import { UniversityIcon } from "../../utils/icons";

class ProgramList extends Component {
  static propTypes = {
    programs: PropTypes.shape({
      items: PropTypes.object
    }),
    fetchPrograms: PropTypes.func,
    // Connect props
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  };

  componentDidMount() {
    this.props.fetchPrograms();
  }

  renderCards() {
    const { programs } = this.props;

    return _.map(programs.items, ({ _id, name, shortname, institution }) => {
      return (
        <Card
          path={`/programs/${_id}`}
          title={name}
          subtitle={institution}
          icon={UniversityIcon}
          additionalClass={styles.cardColor}
          key={_id}
        />
      );
    });
  }

  renderNoContent() {
    return (
      <div className={styles.message}>
        There are no programs to display. To add a program, click on the{" "}
        <span className={styles.addProgram}>Add Program</span> button.
      </div>
    );
  }

  render() {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.headerContainer}>
            <h2>Programs</h2>
            <Link to="/programs/new">
              <Button additionalClass={styles.addBtn}>Add Program</Button>
            </Link>
          </div>
          <div className={styles.cardContainer}>
            {Object.keys(this.props.programs.items).length > 0
              ? this.renderCards()
              : this.renderNoContent()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ programs }) {
  return {
    programs
  };
}

const mapDispatchToProps = {
  fetchPrograms
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramList);
