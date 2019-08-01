import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import programFields from "./programFields";
// API
import { updateProgram } from "../../actions/programs";
// Components
import MainContainer from "../../components/Page/MainContainer";
import { PageHeaderContainer } from "../../components/Page/PageHeader";
import Form from "../../components/Form";
import Loader from "../../components/Loader";

class EditProgram extends Component {
  static propTypes = {
    programId: PropTypes.string.isRequired,
    programExists: PropTypes.bool.isRequired,
    initialValues: PropTypes.shape({
      name: PropTypes.string,
      shortname: PropTypes.string,
      institution: PropTypes.string
    }).isRequired,
    updateProgram: PropTypes.func.isRequired,
    // Connect props
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  };

  render() {
    const {
      programId,
      programExists,
      initialValues,
      updateProgram,
      history
    } = this.props;

    if (!programExists) {
      return <Loader />;
    }

    return (
      <MainContainer>
        <PageHeaderContainer>
          <h3>Edit Program</h3>
        </PageHeaderContainer>
        <Form
          formName="EditProgramForm"
          formFields={programFields}
          initialValues={initialValues}
          onSubmit={values => updateProgram(programId, values, history)}
          buttonText="Update"
        />
      </MainContainer>
    );
  }
}

function mapStateToProps({ programs }, props) {
  const { programId } = props.match.params;
  const program = _.filter(
    programs.items,
    program => program._id === programId
  )[0];

  return {
    programId,
    programExists: program ? true : false,
    initialValues: {
      name: program ? program.name : null,
      shortname: program ? program.shortname : null,
      institution: program ? program.institution : null
    }
  };
}

const mapDispatchToProps = {
  updateProgram
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProgram);
