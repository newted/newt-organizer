import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
// API
import { signOut } from "../../actions/authedUser";
// Components
import Button from "../Button";
import Dropdown from "../Dropdown";
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

  state = {
    showDropdown: false,
    dropdownMenu: null
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
  }

  // So the dropdown is removed before signing out so there isn't a 'memory
  // leak' error thrown.
  componentWillUnmount() {
    this.setState(
      () => ({
        showDropdown: false
      }),
      () => document.removeEventListener("click", this.closeDropdown)
    );
  }

  openDropdown = event => {
    if (this._isMounted) {
      this.setState(
        () => ({
          showDropdown: true
        }),
        () => document.addEventListener("click", this.closeDropdown)
      );
    }
  };

  closeDropdown = event => {
    if (this._isMounted) {
      this.setState(
        () => ({
          showDropdown: false
        }),
        () => document.removeEventListener("click", this.closeDropdown)
      );
    }
  };

  setDropdownMenu = event => {
    if (this._isMounted && event && !this.state.dropdownMenu) {
      this.setState(() => ({
        dropdownMenu: event
      }));
    }
  };

  redirectToProfile = (event) => {
    this.closeDropdown(event)
    this.props.history.push("/profile");
  };

  // Render Login or Logout based on authentication state
  renderButtons() {
    switch (this.props.auth.exists) {
      case false:
        return (
          <Link to="/login">
            <Button additionalClass={styles.loginBtn}>Sign in</Button>
          </Link>
        );
      default:
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
                  visible={this.state.showDropdown}
                  handleOpen={event => this.openDropdown(event)}
                >
                  <FiUser size={22} />
                  <Dropdown.Menu ref={element => this.setDropdownMenu(element)}>
                    <Dropdown.Item
                      onClick={(event) => this.redirectToProfile(event)}
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
  }

  // Render navbar background color based on whether it's landing page or not
  renderNavbarColor() {
    switch (this.props.theme) {
      case "landing":
        return styles.lightBlueNavbar;
      default:
        return styles.lightGreyNavbar;
    }
  }

  render() {
    console.log(this.state)
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
