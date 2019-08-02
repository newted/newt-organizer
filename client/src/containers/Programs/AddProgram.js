import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import programFields from "./programFields";
// Components
import {
  MainContainer,
  HeaderContainer
} from "../../components/Page/Containers";
import Form from "../../components/Form";
// API
import { createProgram } from "../../actions/programs";

class AddProgram extends Component {
  static propTypes = {
    createProgram: PropTypes.func.isRequired,
    // Connect props
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  };

  render() {
    return (
      <MainContainer>
        <HeaderContainer>
          <h3>Add a New Program</h3>
        </HeaderContainer>
        <Form
          formName="AddProgramForm"
          formFields={programFields}
          onSubmit={values =>
            this.props.createProgram(values, this.props.history)
          }
        />
      </MainContainer>
    );
  }
}

const mapDispatchToProps = {
  createProgram
};

export default connect(
  null,
  mapDispatchToProps
)(AddProgram);
