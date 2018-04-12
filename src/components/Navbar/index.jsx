import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FormattedMessage, intlShape, injectIntl } from "react-intl";
import { ReactNavbar } from "react-ref-navigation";
import { ReactIcon, ReactFlyout } from "react-ref-extensions";
import messages from "./lang/default-messages";
import styles from "./navbar.css";

export class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    // this.handleHomeClick = this.handleHomeClick.bind(this);
    this.onHandleMenuToggle = this.onHandleMenuToggle.bind(this);
    this.setFocus = this.setFocus.bind(this);
  }

  onHandleMenuToggle(value) {
    const isOpen = typeof value === "boolean" ? value : !this.state.isOpen;

    this.setState({ isOpen }, this.setFocus);
  }

  setFocus() {
    const panelId = "mobile-nav-panel";
    const burgerId = "mobile-nav-burger";
    const elementId = this.state.isOpen ? panelId : burgerId;
    document.getElementById(elementId).focus();
  }

  // handleHomeClick(e) {
  //   e.preventDefault();
  //   // this.props.searchClear();
  //   // not needed in rr4 browserHistory.push({ pathname: '/' });
  // }

  render() {
    const { isHome, isRtl, intl, smallFormatLogo } = this.props;

    const skipLinkTarget = isHome ? "primary-search" : "main-content";
    return (
      <div data-auto="navbar">
        <ReactNavbar
          skipLink={skipLinkTarget}
          handleMenuToggle={this.onHandleMenuToggle}
        >
          <a
            className={styles.Navbar_logo}
            href="#"
            onClick={this.handleHomeClick}
          >
            <img
              src={smallFormatLogo}
              alt={intl.formatMessage(messages.logo)}
            />
          </a>
          <ul className={styles.Navbar_right}>
            <li>
              <Link to="/" className={styles.Navbar_link}>
                <ReactIcon
                  data-auto="navbar-question-icon"
                  className={styles.Navbar_icon}
                  icon="question"
                />
                <span
                  data-auto="navbar-question-iconText"
                  className={styles.Navbar_iconText}
                >
                  <FormattedMessage {...messages.help} />
                </span>
              </Link>
            </li>
          </ul>
        </ReactNavbar>
        <ReactFlyout
          isOpen={this.state.isOpen}
          handleMenuToggle={this.onHandleMenuToggle}
          isRtl={isRtl}
          className="mobile-nav"
          label={intl.formatMessage(messages.mobileMenu)}
        >
          <ul className={styles.Flyout_list}>
            <li>
              <Link to="/">
                <ReactIcon className={styles.Flyout_icon} icon="question" />
                <span className={styles.Flyout_iconText}>
                  <FormattedMessage {...messages.help} />
                </span>
              </Link>
            </li>
          </ul>
        </ReactFlyout>
      </div>
    );
  }
}

Navbar.propTypes = {
  isHome: PropTypes.bool,
  intl: intlShape.isRequired,
  smallFormatLogo: PropTypes.string.isRequired,
  isRtl: PropTypes.bool.isRequired,
  searchClear: PropTypes.func.isRequired
};

Navbar.defaultProps = {
  isHome: false
};

export default injectIntl(Navbar);
