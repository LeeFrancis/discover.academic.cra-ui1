import React from "react";
import PropTypes from "prop-types";
// import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import Navbar from "../../components/Navbar";
import styles from "./header.css";
import logo from "./SciRef_logo.svg";

export const HeaderContainer = ({
  isRtl,
  smallFormat,
  isAuthorized,
  location,
  actions
}) => {
  const isHome = location.pathname && location.pathname === "/";
  let headerStyle;

  switch (location.pathname) {
    case "/":
      headerStyle = styles.Header_fullScreen;
      break;
    case "/results":
      headerStyle = styles.Header_resultsPage;
      break;
    default:
      headerStyle = styles.Header;
  }

  return (
    <header className={headerStyle}>
      <Navbar
        isHome={isHome}
        isRtl={isRtl}
        smallFormatLogo={smallFormat}
        // searchClear={actions.searchClear}
      />
      {isAuthorized &&
        !isHome && (
          <div className={styles.Header_searchContainer}>
            <div className="wrapper">
              <section className={styles.Header_search}>
                <span className={styles.Header_searchform}>
                  Search Container here
                </span>
              </section>
            </div>
          </div>
        )}
    </header>
  );
};

export const mapStateToProps = state => {
  const { currentLocale, supportedLocales, isRtl } = state.locale;
  const { standardFormat, smallFormat } = state.theme.data.logos;

  return {
    currentLocale,
    supportedLocales,
    isRtl,
    standardFormat,
    smallFormat
  };
};

// export const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(actions, dispatch),
// });

HeaderContainer.propTypes = {
  location: PropTypes.object,
  isRtl: PropTypes.bool,
  smallFormat: PropTypes.string,
  isAuthorized: PropTypes.bool,
  actions: PropTypes.shape({
    // searchClear: PropTypes.func.isRequired,
  }).isRequired
};

HeaderContainer.defaultProps = {
  location: { pathname: "/" },
  isRtl: false,
  isAuthorized: false,
  smallFormat: logo
};

export default connect(mapStateToProps)(HeaderContainer);
