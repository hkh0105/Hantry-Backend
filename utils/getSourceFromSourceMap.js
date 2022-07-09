const sourceMap = require("@cspotcode/source-map");
const fs = require("fs");
const path = require("path");

const error = {
  type: "Error",
  message: "Uncaught Error: this is test",
  source: "http://localhost:3000/static/js/bundle.js",
  lineno: 41,
  colno: 3,
  stack: [
    { function: "App", lineno: 41, colno: 9 },
    { function: "renderWithHooks", lineno: 32501, colno: 22 },
    {
      function: "mountIndeterminateComponent",
      lineno: 35263,
      colno: 17,
    },
    { function: "beginWork", lineno: 36462, colno: 20 },
    {
      function: "HTMLUnknownElement.callCallback",
      lineno: 21451,
      colno: 18,
    },
    {
      function: "Object.invokeGuardedCallbackDev",
      lineno: 21500,
      colno: 20,
    },
    { function: "invokeGuardedCallback", lineno: 21560, colno: 35 },
    { function: "beginWork$1", lineno: 41302, colno: 11 },
    { function: "performUnitOfWork", lineno: 40138, colno: 16 },
    { function: "workLoopSync", lineno: 40075, colno: 9 },
  ],
  user: {
    os: "Mac OS",
    browser: "Chrome",
    engine: "Blink",
    cpu: {},
    ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
  },
  breadcrumbs: [],
};
const mock = fs.readFileSync(path.join(__dirname, "aia.js.map"), "utf-8");

async function getSource(error) {
  const consumer = await new sourceMap.SourceMapConsumer(error);

  const location = consumer.originalPositionFor({
    line: 41,
    column: 3,
  });

  consumer.destroy();
  console.log(location);
}
// getSource(mock);

module.exports = getSource;
