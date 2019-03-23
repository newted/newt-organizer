import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { toggleSidebar } from "../../actions/sidebar";
import sidebarFields from "./sidebarFields";
// Styling
import styles from "./Sidebar.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

class Sidebar extends Component {
  static propTypes = {
    sidebar: PropTypes.shape({
      isCollapsed: PropTypes.bool.isRequired
    }),
    toggleSidebar: PropTypes.func.isRequired
  };

  // Render sidebar links based on fields provided
  renderNavlinks() {
    return sidebarFields.map(({ name, route, icon }) => (
      <li key={name}>
        <NavLink to={route} activeClassName={styles.activeNav}>
          <div className={styles.navlinkRow}>
            {icon}
            {!this.props.sidebar.isCollapsed && <div>{name}</div>}
          </div>
        </NavLink>
      </li>
    ));
  }

  render() {
    return (
      <aside
        className={
          this.props.sidebar.isCollapsed
            ? `${styles.sidebar} ${styles.collapsedSidebar}`
            : `${styles.sidebar} ${styles.expandedSidebar}`
        }
      >
        <div className={styles.sidebarNavlinks}>
          <ul>{this.renderNavlinks()}</ul>
        </div>
        <div className={styles.collapse}>
          <div
            className={styles.collapseIcon}
            onClick={() => this.props.toggleSidebar()}
          >
            {this.props.sidebar.isCollapsed ? (
              <FiChevronRight size={25} />
            ) : (
              <FiChevronLeft size={25} />
            )}
          </div>
        </div>
      </aside>
    );
  }
}

function mapStateToProps({ sidebar }) {
  return {
    sidebar
  };
}

const mapDispatchToProps = {
  toggleSidebar
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Sidebar)
);
