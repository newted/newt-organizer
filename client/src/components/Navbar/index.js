import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
// API
import { signOut } from "../../actions/authedUser";
// Components
import Button from "../Button";
import Dropdown from "react-bootstrap/Dropdown";
import CustomToggle from "../../components/Dropdown/CustomToggle";
// Styling
import styles from "./Navbar.module.css";
import { FiUser } from "react-icons/fi";

class Navbar extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      exists: PropTypes.bool,
      isFetching: PropTypes.bool,
      item: PropTypes.object
    }),
    theme: PropTypes.string,
    signOut: PropTypes.func
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // Render Login or Logout based on authentication state
  renderButtons() {
    // If not authenticated, return Sign In button on Navbar
    if (!this.props.auth.exists) {
      return (
        <Link to="/login">
          <Button additionalClass={styles.loginBtn}>Sign in</Button>
        </Link>
      );
    }

    // If authenticated, return Go to Dashboard and Logout button if on landing
    // page, otherwise the Profile icon with a dropdown.
    return (
      <div className={styles.navbarBtns}>
        {/* If Landing page and logged in, show 'To Dashboard' link */}
        {this.props.theme === "landing" ? (
          <Fragment>
            <Link to="/dashboard">
              <div className={styles.toDash}>Go to Dashboard</div>
            </Link>
            <Button
              additionalClass={styles.loginBtn}
              onClick={this.props.signOut}
            >
              Log out
            </Button>
          </Fragment>
        ) : (
          <div className={styles.userIcon}>
            <Dropdown
              alignRight={true}
              drop="down"
              style={{ height: "22px", cursor: "pointer" }}
            >
              <Dropdown.Toggle id="navbar-options-dropdown" as={CustomToggle}>
                <FiUser size={22} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => this.props.history.push("/profile")}
                >
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={this.props.signOut}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </div>
    );
  }

  // Render navbar background color based on whether it's landing page or not
  renderNavbarColor() {
    if (this.props.theme === "landing") {
      return styles.lightBlueNavbar;
    }

    return styles.lightGreyNavbar;
  }

  render() {
    return (
      <nav className={`${styles.navbarContainer} ${this.renderNavbarColor()}`}>
        <div className={styles.navbar}>
          <Link
            to="/"
            style={{
              color: this.props.theme === "landing" ? "white" : "black"
            }}
          >
            Newt
          </Link>
          {this.renderButtons()}
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }, { theme }) {
  return {
    auth,
    theme
  };
}

const mapDispatchToProps = {
  signOut
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
);
