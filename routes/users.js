const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const {
  createProject,
  updateProjectError,
  updateProjectPerformance,
  updateProjectSourceMap,
  deleteProject,
} = require("../controllers/userController");

router.route("/project/:dsn/error").post(updateProjectError);
router.route("/project/:dsn/performance").post(updateProjectPerformance);
router.route("/project/:dsn/sourceMap").post(updateProjectSourceMap);
router.route("/project").post(verifyToken, createProject);
router.route("/project/:dsn").delete(verifyToken, deleteProject);

module.exports = router;
