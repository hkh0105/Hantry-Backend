const express = require("express");
const router = express.Router();
const { updateProjectError } = require("../controllers/userController");

router.route("/project/:dsn/error").post(updateProjectError);

module.exports = router;
