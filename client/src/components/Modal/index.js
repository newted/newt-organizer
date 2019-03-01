import React, { Component } from "react";
import PropTypes from "prop-types";
// Components
import Button from "../Button";
// Styling
import styles from "./Modal.module.css";
// Helpers
import { findByComponentType } from "../../utils/dropdownHelpers";

const Header = () => null;
const Body = () => null;
const Footer = () => null;

class Modal extends Component {
  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.arrayOf(PropTypes.object)
  };

  showHideClassName() {
    const { showModal } = this.props;

    return showModal
      ? [styles.modal, styles.displayBlock].join(" ")
      : [styles.modal, styles.displayNone].join(" ");
  }

  renderModalHeader() {
    const { children } = this.props;
    const header = findByComponentType(children, Header);

    if (!header) {
      return null;
    }

    return (
      <div className={styles.modalHeader}>
        <h3>{header.props.children}</h3>
      </div>
    );
  }

  renderModalBody() {
    const { children } = this.props;
    const body = findByComponentType(children, Body);

    if (!body) {
      return null;
    }

    return (
      <div className={styles.modalBody}>
        <p>{body.props.children}</p>
      </div>
    );
  }

  renderModalFooter() {
    const { children } = this.props;
    const footer = findByComponentType(children, Footer);

    if (!footer) {
      return null;
    }

    return <div>{footer.props.children}</div>;
  }

  render() {
    const { handleClose } = this.props;

    return (
      <div className={this.showHideClassName()}>
        <div className={styles.modalContent}>
          <div>{this.renderModalHeader()}</div>
          <div>{this.renderModalBody()}</div>
          <div className={styles.modalFooter}>
            <Button
              additionalClass={styles.modalCloseBtn}
              onClick={handleClose}
            >
              Close
            </Button>
            {this.renderModalFooter()}
          </div>
        </div>
      </div>
    );
  }
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
