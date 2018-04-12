/* eslint-disable no-console */
import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
import universalLoader from "./universal";
import getTooling from "./lib/tooling";
import config from "./config";

// Create our express app (using the port optionally specified)
const app = express();
const { port = 3001, application, eurekaClient } = config;
const { appName, market, domain, txnHeader } = application;
const tooling = getTooling(
  {
    appName,
    market,
    domain,
    eurekaClient
  },
  module
);

app.use(cookieParser());
// handle locale
app.use(tooling.setLocale(config.languages));
// This will be conditional dependant on boolean val eureka client
tooling.startEureka();
// Logger middleware
app.use(tooling.loggerMiddleware(txnHeader));

// Compress, parse, and log
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
// Setup the health endpoint
app.get("/health", (req, res) =>
  res.json({
    timestamp: Date.now(),
    uptime: process.uptime()
  })
);
// NFR for app info
app.get("/info", (req, res) => res.status(200).send(config.info()));
// Set up route handling, include static assets.
// Pass it a dummy index.html as server puts together idex.
app.use(
  express.static(path.resolve(__dirname, "../build"), { index: "dummy.html" })
);
app.get("*", universalLoader);

app.listen(port, () => {
  console.log("Starting with following :");
  config.printInfo();
  console.log(`Listening on port ${port}!`);
});

// Handle the bugs somehow
app.on("error", error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  switch (error.code) {
    case "EACCES":
      console.error(`${port} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
