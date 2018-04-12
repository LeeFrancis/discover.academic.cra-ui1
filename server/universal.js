/* eslint-disable react/jsx-filename-extension, consistent-return, no-console,
  import/no-dynamic-require, global-require */
  import path from "path";
  import fs from "fs";
  
  import React from "react";
  import { renderToString } from "react-dom/server";
  import Helmet from "react-helmet";
  import chalk from "chalk";
  import { Provider } from "react-redux";
  import { Route, StaticRouter, matchPath } from "react-router-dom";
  import createHistory from "history/createMemoryHistory";
  import { addLocaleData, IntlProvider } from "react-intl";
  import serialize from "serialize-javascript";
  import createServerStore from "../src/utils/configureStore";
  import App from "../src/components/App";
  import clientRoutes from "../src/routes";
  import config from "./config";
  
  // A simple helper function to prepare the HTML markup
  const prepHTML = (data, store, { html, head, body }) => {
    let str = data.replace('<html lang="en">', `<html ${html}`);
    str = str.replace(
      "</head>",
      `${head}<script>window.__INITIAL_STATE__=${store}</script></head>`
    );
    str = str.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  
    return str;
  };
  
  const universalLoader = (req, res) => {
    let messages;
    let localeData;
    let locale;
    try {
      const resHeaders = res.getHeaders() || {};
      // By grabbing the response we have access to the locale middleware
      locale =
        (resHeaders["set-cookie"] || "locale=en;").match("locale=(\\S*);")[1] ||
        "en";
      messages = require(`../src/lang/assets/${locale}.json`);
      localeData = require(`react-intl/locale-data/${locale}`);
    } catch (e) {
      locale = "en";
      // Fall back to english file that isnt auto generated by yarn intl..
      messages = require("../src/lang/en.json");
      localeData = require("react-intl/locale-data/en");
    }
  
    addLocaleData(localeData);
  
    // Load in our HTML file from our build
    const filePath = path.resolve(__dirname, "../build/index.html");
    fs.readFile(filePath, "utf8", (err, htmlData) => {
      if (err) {
        console.error("Read error", err);
        return res.status(500).end();
      }
      if (!config.serverSideRender) {
        return res.status(200).send(htmlData);
      }
      // Create a store and sense of history based on the current path
      const history = createHistory();
      const store = createServerStore(history);
      const routerContext = {};
  
      // Here's the method for loading data from server-side
      const loadBranchData = () => {
        const promises = [];
        clientRoutes.some(route => {
          const match = matchPath(req.path, route);
  
          if (match && route.loadData) {
            promises.push(route.loadData(store.dispatch, match.params));
          }
          return match;
        });
        return Promise.all(promises);
      };
  
      (async () => {
        try {
          // First thing to do is load all needed data
          await loadBranchData();
          // Render App in React
          // eslint-disable-next-line function-paren-newline
          const htmlContent = renderToString(
            <Provider store={store}>
              <IntlProvider locale={locale} messages={messages}>
                <StaticRouter location={req.url} context={routerContext}>
                  <Route component={App} />
                </StaticRouter>
              </IntlProvider>
            </Provider>
          );
  
          // Check if the render result contains a redirect, if so we need to set
          // the specific status and redirect header and end the response
          if (routerContext.url) {
            res.status(301).setHeader("Location", routerContext.url);
            res.end();
            return;
          }
          // Checking is page is 404
          const status = routerContext.status === "404" ? 404 : 200;
          // Let Helmet know to insert the right tags
          const helmet = Helmet.renderStatic();
          const serializedStore = serialize(store.getState());
          // Form the final HTML response
          const html = prepHTML(htmlData, serializedStore, {
            html: helmet.htmlAttributes.toString(),
            head:
              helmet.title.toString() +
              helmet.meta.toString() +
              helmet.link.toString(),
            body: htmlContent
          });
          // Pass the route and initial state into html template
          res.status(status).send(html);
        } catch (renderErr) {
          res.status(404).send("Not Found :(");
          console.error(chalk.red(`Rendering routes error: ${renderErr}`));
        }
      })();
    });
  };
  
  export default universalLoader;
  