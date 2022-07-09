const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const {
  createProject,
  updateProjectError,
  updateProjectPerformance,
  updateProjectSourceMap,
  deleteProject,
  updateProject,
  getUserProject,
  getError,
  getErrorList,
} = require("../controllers/userController");

router.route("/project/:dsn/error").post(updateProjectError);
router.route("/project/:dsn/performance").post(updateProjectPerformance);
router.route("/project/:dsn/sourceMap").post(updateProjectSourceMap);
router.route("/project").post(verifyToken, createProject);
router.route("/project").get(verifyToken, getUserProject);
router.route("/project/:dsn").delete(verifyToken, deleteProject);
router.route("/project/:dsn").patch(verifyToken, updateProject);
router.route("/project/:dsn/error/:error_id").get(verifyToken, getError);
router.route("project/:dsn/error").get(verifyToken, getErrorList);

module.exports = router;
