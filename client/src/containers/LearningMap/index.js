import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
// API
import { getLearningMap } from "../../actions/learningMap";
// Components
import {
  MainContainer,
  HeaderContainer,
  ContentContainer
} from "../../components/Page/Containers";
import { PageHeader } from "../../components/Page/Headers";
import { MessageBox } from "../../components/Page/MessageBox";
// Styling
import styles from "./LearningMap.module.css";

class LearningMap extends Component {
  componentDidMount() {
    // Get learning map if it hasn't been fetched yet.
    if (_.isEmpty(this.props.learningMap.items)) {
      this.props.getLearningMap();
    }
  }

  renderNoContent() {
    return (
      <MessageBox>
        Your Learning Map tracks and presents the knowledge you have acquired.
        In order to view your Learning Map, you must complete an assignment that
        has Knowledge Tracking.
        <br />
        <br />
        For a demo, add and complete this{" "}
        <a
          href="https://www.youtube.com/watch?v=O5nskjZ_GoI"
          className={styles.link}
        >
          Crash Course Computer Science
        </a>{" "}
        video as an assignment.
      </MessageBox>
    );
  }

  renderContent() {
    return <p>TODO!</p>;
  }

  render() {
    const { knowledgeMap } = this.props.learningMap.items;

    return (
      <MainContainer>
        <HeaderContainer>
          <PageHeader>Learning Map</PageHeader>
        </HeaderContainer>
        <ContentContainer>
          {!_.isEmpty(knowledgeMap)
            ? this.renderContent()
            : this.renderNoContent()}
        </ContentContainer>
      </MainContainer>
    );
  }
}

function mapStateToProps({ learningMap }) {
  return { learningMap };
}

const mapDispatchToProps = { getLearningMap };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearningMap);
