const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth");
const {
  createProject,
  updateProjectError,
  updateProjectPerformance,
} = require("../controllers/userController");

router.route("/project/:dsn/error").post(updateProjectError);
router.route("/project/:dsn/performance").post(updateProjectPerformance);
router.route("/project").post(verifyToken, createProject);

module.exports = router;
