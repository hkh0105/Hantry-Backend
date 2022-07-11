const sourceMap = require("@cspotcode/source-map");
const { parseError } = require("./parseError");

async function getSourceFromSourceMap(error, sourceMap, dsn) {
  let source = error.source;
  let location = { lineno: error.lineno, colno: error.colno };
  const stackList = [];

  const generatedLocation = await getSource(
    sourceMap,
    location.lineno,
    location.colno,
  );

  source = generatedLocation.source;
  location = {
    lineno: generatedLocation.line,
    colno: generatedLocation.column,
  };

  for (let i = 0; i < error.stack.length; i++) {
    const generatedLocation = await getSource(
      sourceMap,
      error.stack[i].lineno,
      error.stack[i].colno,
    );
    const newStack = {
      function: error.stack[i].function + generatedLocation.source,
      location: {
        lineno: generatedLocation.line,
        colno: generatedLocation.column,
      },
    };

    stackList.push(newStack);
  }

  const newError = {
    type: error.type || "React",
    message: error.message || "",
    source: source || "",
    location: location || { colno: 0, lineno: 0 },
    stack: stackList,
    user: error.user || {},
    breadcrumbsURL: error.breadcrumbsURL || [],
    breadcrumbsClick: error.breadcrumbsClick || [],
    createdAt: error.createdAt || Date.now(),
    project: dsn,
  };

  return newError;
}
async function getSource(map, line, column) {
  const consumer = await new sourceMap.SourceMapConsumer(map);
  const location = consumer.originalPositionFor({
    line: line,
    column: column,
  });

  consumer.destroy();
  return location;
}

module.exports = { getSourceFromSourceMap };
