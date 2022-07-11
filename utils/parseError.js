const parseError = (
  type,
  message,
  source,
  location,
  stack,
  user,
  breadcrumbsURL,
  breadcrumbsClick,
  createdAt,
  dsn,
) => {
  return {
    type: type || "React",
    message: message || "",
    source: source || "",
    location: location || { colno: 0, lineno: 0 },
    stack: stack,
    user: user || {},
    breadcrumbsURL: breadcrumbsURL || [],
    breadcrumbsClick: breadcrumbsClick || [],
    createdAt: createdAt || Date.now(),
    project: dsn,
  };
};

module.exports = { parseError };
