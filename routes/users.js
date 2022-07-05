const express = require("express");
const router = express.Router();
const {
  updateProjectError,
  updateProjectPerformance,
} = require("../controllers/userController");

router.route("/project/:dsn/error").post(updateProjectError);
router.route("/project/:dsn/performance").post(updateProjectPerformance);

module.exports = router;
