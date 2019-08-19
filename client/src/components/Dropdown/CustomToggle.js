import React, { Component } from "react";

// Custom toggle used for dropdowns
class CustomToggle extends Component {
  handleClick = e => {
    e.preventDefault();

    this.props.onClick(e);
  };

  render() {
    return <div onClick={this.handleClick}>{this.props.children}</div>;
  }
}

export default CustomToggle;
