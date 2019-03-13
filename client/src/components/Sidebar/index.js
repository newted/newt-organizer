import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { toggleSidebar } from "../../actions/sidebar";
import sidebarFields from "./sidebarFields";
// Styling
import styles from "./Sidebar.module.css";
import { FiChevronLeft } from "react-icons/fi";

class Sidebar extends Component {
  // Render sidebar links based on fields provided
  renderNavlinks() {
    return sidebarFields.map(({ name, route, icon }) => (
      <li key={name}>
        <NavLink to={route} activeClassName={styles.activeNav}>
          <div className={styles.navlinkRow}>
            {icon}
            <div>{name}</div>
          </div>
        </NavLink>
      </li>
    ));
  }

  render() {
    return (
      <aside className={styles.sidebar}>
        <div className={styles.sidebarNavlinks}>
          <ul>{this.renderNavlinks()}</ul>
        </div>
        <div className={styles.collapse}>
          <div
            className={styles.collapseIcon}
            onClick={() => this.props.toggleSidebar()}
          >
            <FiChevronLeft size={25} />
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
