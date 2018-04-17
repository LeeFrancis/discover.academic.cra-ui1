import React, { Component } from "react";
import { ReactA11yTitle } from "react-ref-extensions";
import { connect } from "react-redux";

import styles from "./styles.css";

export class Results extends Component {
  render() {
    return (
      <ReactA11yTitle title="Results">
        <div>Reuslts are in here</div>
      </ReactA11yTitle>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
