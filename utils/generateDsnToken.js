const { v4: uuidv4 } = require("uuid");

const generateDsnToken = (project, userId) => {
  project.dsn = uuidv4();
  project.owner = userId;
  return project;
};

module.exports = { generateDsnToken };
