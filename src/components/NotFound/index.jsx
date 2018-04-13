import React from "react";
import { FormattedMessage } from "react-intl";
import styles from "./styles.css";
import messages from "./lang/default-messages";

const NotFound = () => (
  <div className={styles.NotFound} data-auto="not-found">
    <h2 className={styles.NotFound_title}>
      <FormattedMessage {...messages.notFoundTitle} />
    </h2>
    <p className={styles.NotFound_message}>
      <FormattedMessage {...messages.notFoundMessage} />
    </p>
  </div>
);

export default NotFound;
