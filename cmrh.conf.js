const path = require("path");
const cssnested = require("postcss-nested");
const cssnext = require("postcss-cssnext");
const cssapply = require("postcss-apply");
const pkg = require(path.resolve(process.cwd(), "package.json"));
const { generateScopedName = "[local]--[hash:base64:5]" } = pkg;
module.exports = {
  // Same scope name as in webpack build
  generateScopedName,
  prepend: [cssnext(), cssnested(), cssapply()]
};
