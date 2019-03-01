import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Components
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
// API
import {
  authenticateWithGoogle,
  authenticateWithGithub
} from "../../actions/authedUser";
import { signInDemoUser } from "../../actions/demo";
// Styling
import styles from "./Login.module.css";
import googleLogo from "../../styles/googleLoginLogo";
import githubLogo from "../../styles/GitHubLoginLogo.png";

class Login extends Component {
  static propTypes = {
    authenticateWithGoogle: PropTypes.func.isRequired,
    authenticateWithGithub: PropTypes.func.isRequired,
    signInDemoUser: PropTypes.func.isRequired,
    // Connect props
    history: PropTypes.object
  };

  render() {
    const {
      history,
      authenticateWithGoogle,
      authenticateWithGithub,
      signInDemoUser
    } = this.props;

    return (
      <div>
        <Navbar theme="landing" />
        <div className={styles.container}>
          <div className={styles.panel}>
            <h3 className={styles.panelHeader}>Sign in</h3>
            <div className={styles.panelBody}>
              <ul>
                <li className={styles.providerBtn}>
                  <Button
                    additionalClass={`${styles.loginBtn} ${styles.googleBtn}`}
                    onClick={() => authenticateWithGoogle(history)}
                  >
                    <div className={styles.btnContent}>
                      {googleLogo}
                      <div style={{ marginRight: "1.5rem" }}>
                        Sign In With Google
                      </div>
                    </div>
                  </Button>
                </li>
                <li>
                  <Button
                    additionalClass={`${styles.loginBtn} ${styles.githubBtn}`}
                    onClick={() => authenticateWithGithub(history)}
                  >
                    <div className={styles.btnContent}>
                      <img
                        alt="github-logo"
                        src={githubLogo}
                        className={styles.logo}
                      />
                      <div style={{ marginRight: "1.5rem" }}>
                        Sign In With GitHub
                      </div>
                    </div>
                  </Button>
                </li>
              </ul>
              <div className={styles.divider}>OR</div>
              <Button
                additionalClass={styles.demoBtn}
                onClick={() => signInDemoUser(history)}
              >
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  authenticateWithGoogle,
  authenticateWithGithub,
  signInDemoUser
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
