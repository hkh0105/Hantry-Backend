const sourceMap = require("@cspotcode/source-map");

async function getSourceFromSourceMap(error, sourceMap, dsn) {
  const consumer = await new sourceMap.SourceMapConsumer(error);
  const location = consumer.originalPositionFor({
    line: error.lineno,
    column: error.colno,
  });

  const newError = {
    type: error.type || "React",
    message: error.message || "",
    source: error.source || "",
    location: location || { colno: 0, lineno: 0 },
    stack: error.stack || [],
    user: error.user || {},
    breadcrumbsURL: error.breadcrumbsURL || [],
    breadcrumbsClick: error.breadcrumbsClick || [],
    createdAt: error.createdAt || Date.now(),
    project: dsn,
  };

  consumer.destroy();

  return newError;
}

module.exports = { getSourceFromSourceMap };
