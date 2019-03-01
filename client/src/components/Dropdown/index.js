import React, { Component } from "react";
import PropTypes from "prop-types";
// Styling
import styles from "./Dropdown.module.css";
// Helpers
import { findByComponentType } from "../../utils/dropdownHelpers";

const Menu = () => null;
const Item = () => null;

class Dropdown extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    handleOpen: PropTypes.func.isRequired,
    children: PropTypes.arrayOf(PropTypes.object)
  };

  showHideClassName() {
    return this.props.visible
      ? [styles.menu, styles.displayBlock].join(" ")
      : [styles.menu, styles.displayNone].join(" ");
  }

  renderDropdownItems(items) {
    return items.map(item => {
      const dividerClass = [styles.item, styles.divider].join(" ");

      return (
        <div
          // If the <Dropdown.Item> is empty, create a divider
          className={item.props.children ? styles.item : dividerClass}
          onClick={item.props.onClick} // Specific onClick property of the item
          key={
            item.props.children
              ? item.props.children
              : "divider" + Math.random() // Unique key for divider
          }
        >
          {item.props.children}
        </div>
      );
    });
  }

  renderDropdownMenu() {
    const { children } = this.props;
    const menu = findByComponentType(children, Menu);

    if (!menu) {
      return null;
    }

    return (
      <div
        className={this.showHideClassName()}
        ref={element => menu.ref(element)}
      >
        {menu.props.children.length > 0
          ? this.renderDropdownItems(menu.props.children)
          : // Pass as array if only one child
            this.renderDropdownItems([menu.props.children])}
      </div>
    );
  }

  render() {
    return (
      <div className={styles.dropdown} onClick={this.props.handleOpen}>
        {this.props.children[0]} {/*Renders the icon or Dropdown name */}
        {this.renderDropdownMenu()}
      </div>
    );
  }
}

Dropdown.Menu = Menu;
Dropdown.Item = Item;

export default Dropdown;
