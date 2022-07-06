const { v4: uuidv4 } = require("uuid");

const generateDsnToken = project => {
  project.dsn = uuidv4();

  return project;
};

module.exports = { generateDsnToken };
