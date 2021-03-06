const sourceMap = require("@cspotcode/source-map");
const Project = require("../model/Project");
const { parseError } = require("./parseError");

async function getSourceFromSourceMap(error, sourceMap, dsn) {
  try {
    console.log(sourceMap);
    let source = error.source;
    let location = {
      lineno: error.location.lineno,
      colno: error.location.colno,
    };
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

      stackList.push({
        function:
          error.stack[i].function +
          generatedLocation.source +
          " " +
          generatedLocation.name,
        lineno: generatedLocation.line,
        colno: generatedLocation.column,
      });
    }
    console.log(stackList);
    const newError = {
      type: error.type || "React",
      message: error.message || "",
      source: location.source || "",
      location: location || { colno: 0, lineno: 0 },
      stack: stackList,
      user: error.user || {},
      breadcrumbsURL: error.breadcrumbsURL || [],
      breadcrumbsClick: error.breadcrumbsClick || [],
      createdAt: error.createdAt || Date.now(),
      project: dsn,
    };

    return newError;
  } catch (error) {
    console.log(error);
  }
}

async function getSource(map, line, column) {
  const consumer = await new sourceMap.SourceMapConsumer(map);
  const location = consumer.originalPositionFor({
    line: line,
    column: column,
  });

  console.log(location);
  consumer.destroy();
  return location;
}

module.exports = { getSourceFromSourceMap };
