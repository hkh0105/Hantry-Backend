const CustomeError = require("../utils/CustomError");
const Error = require("../model/Error");
const Project = require("../model/Project");
const { generateDsnToken } = require("../utils/generateDsnToken");
const {
  USER_DOES_NOT_EXIST,
  FOUND_NO_FIELD,
  FOUND_NO_DATA,
  INVALID_EMAIL,
} = require("../constants/errorConstants");

async function saveNewProject(project) {
  const dsnGeneratedProject = generateDsnToken(project);
  const newProject = await Project.create(dsnGeneratedProject);
  if (!newProject) {
    return null;
  }

  return newProject;
}

module.exports = { saveNewProject };
