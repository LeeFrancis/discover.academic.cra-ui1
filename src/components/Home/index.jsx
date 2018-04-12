import React from "react";
import { ReactA11yTitle } from "react-ref-extensions";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const Home = () => (
  <div>
    <ReactA11yTitle title="Application Home" />
    <h1>
      <FormattedMessage id="Home.welcome" />
    </h1>
    <ul>
      <li>
        <Link
          href="/hello"
          to={{
            pathname: "/hello",
            state: { lastClick: "hello" }
          }}
        >
          Hello World MicroUI example
        </Link>
      </li>
    </ul>
  </div>
);

export default Home;
